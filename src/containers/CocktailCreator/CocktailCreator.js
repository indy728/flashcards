import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Dashboard from '../../components/Dashboard/Dashboard'
import { ContentBlock, Header, Modal } from '../../components/UI'
import IngredientForm from '../../components/IngredientForm/IngredientForm'
import { updateObject } from '../../shared/objectUtility'
import { idTransform, nameTransform, qtyStringToFloat } from '../../shared/stringUtility'
import * as actions from '../../store/actions'

const attributesInit = {
    key: 'drinkName',
    label: 'Drink Name',
    type: 'name'
}

const Wrapper = styled(ContentBlock)`
    padding: 0 2rem;
`

class CocktailCreator extends Component {
    state = {
        attributes: [],
        count: 1,
        adding: false,
        selectorInit: null,
        drinkControls: {
            name: {
                tier: 0,
                type: 'name',
                label: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '',
                    autocomplete: '',
                },
                value: '',
                removeable: false,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            ingredient: {
                tier: 1,
                type: 'ingredient',
                label: '',
                // ingredient: '',
                attributes:{},
                // category: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '',
                    autocomplete: '',
                },
                // value:'',
                qtyType: 'oz',
                removeable: true,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            glassware: {
                tier: 2,
                type: 'glassware',
                label: '',
                elementType: 'static',
                elementConfig: {},
                value: '',
                removeable: true,
                validation: {},
                valid: true,
                touched: true
            },
            instructions: {
                tier: 3,
                type: 'instruction',
                label: '',
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: '',
                    autocomplete: '',
                },
                value: '',
                removeable: true,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    componentDidMount() {
        if (!this.props.ingredients) this.props.onInitIngredients()
        this.addAttributeHandler(attributesInit)
    }

    addingCanceled = () => {
        this.setState({adding: false, selectorInit: []})
        // ADD CLEAR FORM ATTRIBUTES
    }

    addingTrue = (selectors) => {
        this.setState({adding: true, selectorInit: selectors})
        // ADD FORM ATTRIBUTES
    }


    addAttributeHandler = newAttribute => {
        const { attributes, count } = this.state
        let controls = {...this.state.drinkControls[newAttribute.type]}
        let duplicate = false;

        if (newAttribute.attributes) {
            Object.keys(newAttribute.attributes).forEach(attr => {
                if (newAttribute.attributes[attr] === true)
                controls = updateObject(controls, {
                    [attr]: ''
                })
            })
        }

        if (newAttribute.type !== 'instructions') {
            for (let i in attributes) {
                if (attributes[i].label === newAttribute.label) {
                    duplicate = true
                    break
                }
            }
        }
        if (!duplicate) {
            if (newAttribute.type === 'ingredient' && !newAttribute.attributes.qty && !newAttribute.attributes.text) {
                newAttribute = updateObject(newAttribute, {
                    valid: true,
                    validation: {
                        required: false
                    }
                })
            }
            controls = updateObject(controls, newAttribute)
            controls.added = count
            attributes.push(controls)
            attributes.sort((a, b) => {
                if (a.tier === b.tier) {
                    if (a.subTier === b.subTier) return a.added > b.added ? 1 : -1
                    return a.subTier > b.subTier ? 1 : -1
                }
                return a.tier > b.tier ? 1 : -1
            })
            this.setState({ attributes, count: count + 1 })
        }
    }
  
    removeAttributeHandler = (event, index) => {
        event.preventDefault()
        const attributes = [...this.state.attributes]

        attributes.splice(index, 1)
        this.setState({ attributes })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        
        if (!rules) return true
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.length) {
            isValid = value.length >= rules.length.absMin && value.length <= rules.length.absMax && isValid
        }

        // TO DO
        // way more validation stuff

        return isValid
    }

    inputChangedHandler = (event, controlIndex, valueType = "value") => {
        const { attributes } = this.state
        let controls = attributes[controlIndex]
        const updatedControls = updateObject(controls, {
            [valueType]: event.target.value,
            valid: this.checkValidity(event.target.value, controls.validation),
            touched: true
        })
        let formIsValid = true
        
        attributes[controlIndex] = updatedControls
        for (let attribute in attributes) {
            formIsValid = attributes[attribute].valid && formIsValid
        }
        this.setState({ attributes, formIsValid })
    }

    qtyTypeChangedHandler = (event, controlIndex) => {
        const { attributes } = this.state
        let controls = attributes[controlIndex]
        const updatedControls = updateObject(controls, {
            qtyType: event.target.value,
        })

        attributes[controlIndex] = updatedControls
        this.setState({ attributes })
    }

    cocktailSubmitHandler = event => {
        event.preventDefault()

        const { attributes } = this.state
        let cocktailObj = {
            name: '',
            elements: {},
            instructions: {}
        }
        let firstInstruction = -1
        let id = ''

        attributes.forEach((attribute, i) => {
            let idNum = ''
            let { type, value, qtyType, key, label, qty, text } = attribute
            let attributesObj = attribute.attributes

            if (type === 'name') {
                // const { value } = attribute
                const name = nameTransform(value)
                id = idTransform(value.replace(/^the /i, ''))
                cocktailObj = updateObject(cocktailObj, {
                    name
                })
            } else if (type === 'instructions') {
                if (firstInstruction !== -1) {
                    idNum = idNum + (i - firstInstruction)
                } else if (i < attributes.length - 1) {
                    firstInstruction = i
                }
                cocktailObj = updateObject(cocktailObj, {
                    instructions: updateObject(cocktailObj.instructions, {
                        ['instruction' + idNum]: text
                    })
                })
            } else if (type === 'ingredient') {
                idNum = value
                cocktailObj = updateObject(cocktailObj, {
                    elements: updateObject(cocktailObj.elements, {
                        [key]: {
                            order: i - 1,
                            label
                        }
                    })
                })
                if (attributesObj) {
                    if (attributesObj.qty) {
                        cocktailObj.elements[key] = updateObject(cocktailObj.elements[key], {
                            qty: qtyStringToFloat(qty),
                            qtyType
                        })
                    }
                    if (attributesObj.text) {
                        cocktailObj.elements[key] = updateObject(cocktailObj.elements[key], {
                            text
                        })
                    }
                }
            }
        })
        const cocktailNode = {
            [id]: cocktailObj
        }
        this.props.onAddCocktail(cocktailNode)
        this.clearAttributes()
        console.log('[CocktailCreator] cocktailNode: ', cocktailNode)
    }

    clearAttributes = () => {
        this.setState({
            attributes: [],
            count: 1,
            adding: false,
            selectorInit: null,
            formIsValid: false}, () => {
            this.addAttributeHandler(attributesInit)
        })
    }

    render() {
        let form = (
            this.state.adding ? 
            <IngredientForm 
                selectorInit={this.state.selectorInit}
                closeModal={this.addingCanceled}
                /> : 
            null
        )

        return (
            <React.Fragment>
                <Modal show={this.state.adding} modalClosed={this.addingCanceled}>
                    {form}
                </Modal>
                <Wrapper
                    className='dashboard'
                    >
                    <Header className='dashboard--header'>Add A New Cocktail</Header>
                    <Dashboard
                        ingredients={this.props.ingredients}
                        addIngredient={this.addingTrue}
                        attributes={this.state.attributes}
                        addAttribute={this.addAttributeHandler}
                        removeAttribute={this.removeAttributeHandler}
                        inputChanged={this.inputChangedHandler}
                        selectChanged={this.qtyTypeChangedHandler}
                        formIsValid={this.state.formIsValid}
                        cocktailSubmitHandler={this.cocktailSubmitHandler}
                        />
                </Wrapper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        loading: state.ingredients.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        onAddCocktail: cocktail => dispatch(actions.addCocktail(cocktail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCreator)
