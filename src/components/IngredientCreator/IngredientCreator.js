import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Header from '../UI/Header/Header'

import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
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

const AddElementInput = styled(Input)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

class IngredientCreator extends Component {
    state = {
        selector: ['ingredients'],
        tier: 0,
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
    }

    componentDidMount() {
        if (this.props.ingredients === null) {
            this.props.onInitIngredients()
        }
    }

    selectChangedHandler = (event) => {
        const selection = event.target.value
        const selector = [...this.state.selector]
        const index = selector.indexOf(event.target.name)

        if (event.target.value === 'add' || event.target.value === 'edit') {
            this.setState({
                selector: selector.slice(0, index + 1),
                formType: event.target.value,
                tier: index,
            })
            return
        }
        if (index < this.state.tier) {
            const newSelector = selector.slice(0, index + 1)
            newSelector.push(selection)
            console.log(newSelector)
            this.setState({
                selector: newSelector,
                tier: newSelector.length - 1,
                addProduct: false,
                editList: false
            })
        } else {
            selector.push(selection)
            this.setState({
                selector: selector,
                formType: 'select',
                tier: this.state.tier + 1,
                addProduct: false,
                editList: false
            })
        }
    }

    objectFormCreator = () => {
        const { selector, tier } = this.state
        const { ingredients } = this.props
        const dropdowns = []

        const pickObj = (obj, currentTier, maxTier) => {
            if (currentTier < maxTier) return pickObj(obj[selector[currentTier + 1]], currentTier + 1, maxTier)
            else return obj
        }

        for (let i = 0 ; i <= tier; i++) {
            let name = selector[i]
            let optionKeys = Object.keys(pickObj(ingredients, 0, i))

            dropdowns.push(
                <IngredientTierForm
                    key={i}
                    name={name}
                    changed={this.selectChangedHandler}
                    options={optionKeys}>
                </IngredientTierForm>
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
            updatedControls[control] = updateObject(updatedControls[control], {
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
                    <button onClick={this.clearInputs}>clear inputs</button>
                    <Header>Add A New Ingredient</Header>
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
