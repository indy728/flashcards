import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import Header from '../../components/UI/Header/Header'
import Dashboard from '../../components/Dashboard/Dashboard'
import { updateObject } from '../../shared/utility'
import * as actions from '../../store/actions'

const attributesInit = {
    key: 'drinkName',
    label: 'Drink Name',
    type: 'name'
}

class CocktailCreator extends Component {
    state = {
        attributes: [],
        count: 1,
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
                ingredient: '',
                category: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
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
            instructions: {
                tier: 2,
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

    addAttributeHandler = newAttribute => {
        const { attributes, count } = this.state
        let controls = {...this.state.drinkControls[newAttribute.type]}
        let duplicate = false;

        if (newAttribute.type !== 'instructions') {
            for (let i in attributes) {
                if (attributes[i].label === newAttribute.label) {
                    duplicate = true
                    break
                }
            }
        }
        if (!duplicate) {
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
        console.log('[CocktailCreator] attributes: ', attributes)

        console.log('[CocktailCreator] index: ', index)
        attributes.splice(index, 1)
        console.log('[CocktailCreator] attributes: ', attributes)
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

    inputChangedHandler = (event, controlIndex) => {
        const { attributes } = this.state
        let controls = attributes[controlIndex]
        const updatedControls = updateObject(controls, {
            value: event.target.value,
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

    cocktailSubmitHandler = event => {
        event.preventDefault()

        const { attributes } = this.state
        let cocktailNode = {}
        let firstInstruction = -1

        for (let i in attributes) {
            const attribute = attributes[i]
            console.log('[CocktailCreator] attribute: ', attribute)
            let name = attribute.name
            if (name === 'instruction') {
                if (firstInstruction !== -1) {
                    name = name + (i - firstInstruction)
                } else if (i < attributes.length - 1) {
                    firstInstruction = i
                }
            }
            cocktailNode = updateObject(cocktailNode, {
                [name]: attribute.value
            })
        }
        console.log('[CocktailCreator] cocktailNode: ', cocktailNode)
    }

    clearAttributes = () => {
        this.setState({attributes: []}, () => {
            this.addAttributeHandler(attributesInit)
        })
    }

    render() {
        return (
            <React.Fragment>
                <ContentBlock>
                    <Header>Add A New Cocktail</Header>
                    <Dashboard
                        className='dashboard'
                        ingredients={this.props.ingredients}
                        attributes={this.state.attributes}
                        addAttribute={this.addAttributeHandler}
                        removeAttribute={this.removeAttributeHandler}
                        inputChanged={this.inputChangedHandler}
                        formIsValid={this.state.formIsValid}
                        cocktailSubmitHandler={this.cocktailSubmitHandler}
                        />
                </ContentBlock>
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
        onInitIngredients: () => dispatch(actions.fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCreator)
