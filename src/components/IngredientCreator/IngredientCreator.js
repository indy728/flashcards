import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { database } from '../../store/actions/firebase'
import { updateObject } from '../../shared/utility'
import * as actions from '../../store/actions'


const AddElementForm = styled.form`
    width: 80%;
    margin: 1rem 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

const IngredientDropDownSection = styled.div`
    width: 80%;
    height: 5rem;
    margin: .5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AddElementInput = styled(Input)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

class IngredientCreator extends Component {
    state = {
        // ingredients: null,
        selector: ['ingredients'],
        tier: 0,
        // loading: true,
        formType: 'select',
        ingredientControls: {
            ingredient: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add Your Ingredient',
                    autocomplete: '',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add Your Category',
                    autocomplete: '',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            product: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add Your Product or Instruction',
                    autocomplete: '',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            value: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add a type or value',
                    autocomplete: '',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        rootRef: database.ref()
    }

    reloadIngredients = () => {
        const ings = this.state.rootRef.child('ingredients')

        ings.once('value', snap => {
            this.setState({ingredients: snap.val(), loading: false})
        })
        console.log(this.state)
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    selectChangedHandler = (event) => {
        // this.reloadIngredients()

        const selection = event.target.value
        let tier = this.state.tier
        const selector = [...this.state.selector]
        const index = selector.indexOf(event.target.name)
        console.log(index, tier)

        if (event.target.value === 'add' || event.target.value === 'edit') {
            this.setState({
                selector: selector.slice(0, index + 1),
                formType: event.target.value,
                tier: index,
            })
            return
        }
        if (index < tier) {
            const newSelector = selector.slice(0, index + 1)
            newSelector.push(selection)
            console.log(newSelector)
            this.setState({
                selector: newSelector,
                // formType: 'select',
                tier: newSelector.length - 1,
                addProduct: false,
                editList: false
            })
        } else {
            // if (tier === 2) {
            //     console.log('here')
            //     selector[2] = selection
            //     this.setState({
            //         selector: selector,
            //         formType: 'add',
            //         addProduct: false,
            //         editList: false
            //     })
            //     console.log(this.state.formType)
            // } else {
                selector.push(selection)
                this.setState({
                    selector: selector,
                    formType: 'select',
                    tier: tier + 1,
                    addProduct: false,
                    editList: false
                })
            // }
        }
    }

    objectFormCreator = () => {
        const ingredients = {...this.props.ingredients}
        console.log(this.props.ingredient)
        const dropdowns = []
        const tier = this.state.tier
        const selector = [...this.state.selector]
        console.log(tier, selector)

        for (let i = 0 ; i <= tier && i < 3 ; i++) {
            let obj = null

            switch(i) {
                case (0):
                    obj = ingredients
                    break
                case (1):
                    obj = ingredients[selector[1]]
                    break
                default:
                    obj = null
            }

            let options = null
            
            if (i < 2) {
                const optionKeys = Object.keys(obj)
                options = optionKeys.map(key => <option key={key} value={key}>{key}</option>)
            }

            dropdowns.push(
                <IngredientDropDownSection key={i} >
                    <select name={this.state.selector[i]} onChange={this.selectChangedHandler}>
                        <option hidden>-- select an option--</option>
                        {options}
                        <option value="add">Add New Item to {this.state.selector[i]}</option>
                        <option value="edit">Edit ingredient list</option>
                    </select>
                </IngredientDropDownSection>
            )
        }
        return dropdowns
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

    inputChangedHandler = (event, controlName) => {
        let controls = {...this.state.ingredientControls}
        let formIsValid = true
        let i = 0

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })
        for (let inputIdentifier in updatedControls) {
            if (this.state.tier <= i) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid
            }
            i = i + 1
        }
        this.setState({ingredientControls: updatedControls, formIsValid: formIsValid})
    }

    clearInputs = () => {
        let updatedControls = {...this.state.ingredientControls}
        for (let control in updatedControls) {
            updateObject(updatedControls[control], {
                value: '',
                valid: false,
                touched: false
            })
        }
        this.setState({ingredientControls: updatedControls, tier: 0, formType: 'select', formIsValid: false})
    }

    addIngredientHandler = (event) => {
        event.preventDefault()

        const controls = this.state.ingredientControls
        const tier = this.state.tier
        const ingredient = tier >= 1 ? this.state.selector[1] : controls.ingredient.value
        const category = tier === 2 ? this.state.selector[2] : controls.category.value
        const productObj = {[controls.product.value]: controls.value.value}
        const categoryObj = {[category]: productObj}
        const ingredientObj = {[ingredient]: categoryObj}
        const databaseRefArray = ['ingredients', ingredient, category]
        
        let node = {}

        if (tier === 1) {
            node = updateObject(this.props.ingredients[ingredient], categoryObj)
        } else if (tier === 2) {
            node = updateObject(this.props.ingredients[ingredient][category], productObj)
        } else {
            node = updateObject(this.props.ingredients, ingredientObj)
        }

        this.props.onAddIngredient(node, databaseRefArray, tier)
        this.clearInputs()
    }

    render() {
        let window = <Spinner />
        if (!this.props.loading) {
            const formMenus = this.objectFormCreator()
            

            const formElementsArray = []
            const formElementsObj = {...this.state.ingredientControls}
           
            for (let key in formElementsObj) {
                formElementsArray.push({
                    id: key,
                    config: formElementsObj[key],
                })
            }
            let newItemForm = null
            
            if (this.state.formType === 'add') {
                let form = formElementsArray.map(formElement => {
                    if (this.state.tier > 0 && formElement.id === 'ingredient') return null
                    if (this.state.tier > 1 && formElement.id === 'category') return null
                    return (
                        <AddElementInput 
                            key={formElement.id}
                            autocomplete={formElement.config.elementConfig.autocomplete || ''}
                            className="AddElementInput"
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                            />
                    )
                })
                newItemForm = (
                    <AddElementForm onSubmit={this.addIngredientHandler}>
                        {form}
                        <Button
                            disabled={!this.state.formIsValid}>
                                SUBMIT
                        </Button>
                    </AddElementForm>
                )
            }
            window = (
                <ContentBlock>
                    {formMenus}
                    {newItemForm}
                </ContentBlock>
            )
        }
        return (
            <React.Fragment>
                {window}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        loading: state.ingredients.loading,
        error: state.ingredients.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        onAddIngredient: (ingredientNode, dbRefArray, tier) => dispatch(actions.addIngredient(ingredientNode, dbRefArray, tier))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCreator)
