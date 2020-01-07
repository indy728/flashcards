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
import { idTransform, nameTransform } from '../../shared/stringUtility'
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
`

const FormElement = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

const AddFormElement = styled.div`
    margin-bottom: 2rem;
    padding: .5rem 2rem;
    border: 1px solid black;
    background-color: orangered;
`

const controlsInit = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: '',
        // example: '',
        autocomplete: '',
    },
    value: '',
    validation: {
        required: true,
    },
    valid: false,
    touched: false
}

const ignored = ["name", "rank"]

class IngredientCreator extends Component {
    state = {
        selector: ['ingredients'],
        formType: 'select',
        formControls: {},
        groupControls: [
            { 
                name: 'ingredient',
                placeholder: 'New Ingredient Name',
                example: 'spirit'
            },
            { 
                name: 'category',
                placeholder: 'New Category Name',
                example: 'gin'
            },
            { 
                name: 'item',
                placeholder: 'New Item Name',
                example: 'London Dry Gin'
            },
        ],
        productControls: [
            {
                name: 'product',
                placeholder: 'Product Name',
                example: 'Beefeater'
            }
        ],
        formIsValid: false,
    }

    componentDidMount() {
        if (this.props.ingredients === null) {
            this.props.onInitIngredients()
        }
        if (this.props.selectorInit) {
            const newSelector = this.state.selector.concat(this.props.selectorInit)
            this.setState({ selector: newSelector })
        }
    }

    selectChangedHandler = (event) => {
        const { selector } = this.state
        const tier = selector.length - 1
        const selection = event.target.value
        const index = selector.indexOf(event.target.name)

        const setFormControls = (controlArray) => {
            let formControls = {}
            for (let control in controlArray) {
                const { name, placeholder, example } = controlArray[control]
                formControls = updateObject(formControls, {
                    [name]: updateObject(controlsInit, {
                        elementConfig: updateObject(controlsInit.elementConfig, {
                            placeholder: placeholder + ` (i.e.: '${example}')`
                        })
                    })
                })
            }
            return formControls
        }

        if (tier > 2) {
            this.setState({
                formControls: setFormControls(this.state.productControls),
                formType: 'add'
            })
        } else if (event.target.value === 'add' || event.target.value === 'edit') {
            const groupControls = [ ...this.state.groupControls ]
            
            this.setState({
                formControls: setFormControls([groupControls[index]]),
                selector: selector.slice(0, index + 1),
                formType: event.target.value,
            })
        } else if (index < tier) {
            const newSelector = selector.slice(0, index + 1)
            newSelector.push(selection)
            this.setState({
                selector: newSelector,
                formControls: {},
                formType: 'select'
            })
        } else {
            selector.push(selection)
            this.setState({
                selector,
                formControls: {},
                formType: 'select',
            })
        }
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
        let controls = {...this.state.formControls}
        const tier = this.state.selector.length - 1
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
            if (tier <= i) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid
            }
            i = i + 1
        }
        this.setState({formControls: updatedControls, formIsValid: formIsValid})
    }

    clearInputs = () => {
        let updatedControls = {...this.state.formControls}
        for (let control in updatedControls) {
            updatedControls[control] = updateObject(updatedControls[control], {
                value: '',
                valid: false,
                touched: false
            })
        }
        this.setState({formControls: updatedControls, formType: 'select', formIsValid: false})
    }

    addIngredientHandler = event => {
        event.preventDefault()

        const { formControls, groupControls, selector } = this.state
        const { ingredients } = this.props
        const tier = selector.length - 1
        const dbRefArray = [...selector]
        const controlArray = Object.keys(formControls)
        const key = groupControls[tier].name

        const setNode = (i, tier, selector, node) => {
            if (i < tier) {
                node = node[selector[i + 1]]
                return setNode(i + 1, tier, selector, node)
            } else {
                return node
            }
        }

        const id = idTransform(formControls[key].value)
        const name = nameTransform(formControls[key].value)
        const levelKeys = Object.keys(setNode(0, tier, selector, ingredients)).filter(key => {
            return ignored.indexOf(key) === -1
        })
        // console.log('[IngredientForm] id: ', id)
        // console.log('[IngredientForm] name: ', name)
        // console.log('[IngredientForm] levelKeys: ', levelKeys)
        let newItem = {
            [id]: {
                name: name,
                rank: levelKeys.length
            }
        }

        const setObj = (obj, i, selector, tier) => {
            if (i > tier) {
                return setObj({ [selector[i]]: obj}, i - 1, selector, tier)
            } else {
                return obj
            }
        }

        for (let control in controlArray) {
            dbRefArray.push(formControls[controlArray[control]].value.toLowerCase())
        }
        // THE CODE BELOW IS FOR creating an initial object and I'm not sure if I still need it
        // const addIngredientObject = setObj(newItem, 2, dbRefArray, tier)

        const addIngredientObject = newItem

        console.log('[IngredientForm] addIngredientObject: ', addIngredientObject)
        // let node = ingredients

    
        let node = setNode(0, tier, dbRefArray, ingredients)

        if (Object.keys(node).indexOf(Object.keys(addIngredientObject)[0].toLowerCase()) === -1) {
            node = updateObject(node, addIngredientObject)
            this.props.onAddIngredient(node, dbRefArray, tier)
            this.setState({
                selector: ['ingredients'],
                formType: 'select',
                formControls: {},
                formIsValid: false
            })
        } else {
            //  NEED A POPUP WARNING HERE
            console.log('Duplicate of something')
            this.clearInputs()
        }
    }

    dropdownMenuCreator = () => {
        const { selector } = this.state
        const { ingredients } = this.props
        const tier = selector.length - 1
        const dropdowns = []

        const pickObj = (obj, currentTier, maxTier) => {
            if (currentTier < maxTier) {
                return pickObj(obj[selector[currentTier + 1]], currentTier + 1, maxTier)
            } else {
                return obj
            }
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

    addItemForm = () => {
        const formElementsArray = []
        const formElementsObj = {...this.state.formControls}
    
        for (let key in formElementsObj) {
            formElementsArray.push({
                id: key,
                config: formElementsObj[key],
            })
        }

        let form = formElementsArray.map(formElement => {
            let addButton = null;
            console.log('[IngredientForm] this.state.selector: ', this.state.selector)
            console.log('[IngredientForm] this.state.formControls: ', this.state.formControls)
            if (formElement.id !== 'item'){
                addButton = (
                    <AddFormElement>
                        Add Item To {formElement.config.value}
                    </AddFormElement>
                )
            }
            return (
                <FormElement key={formElement.id}>
                    <AddElementInput 
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
                        {addButton}
                </FormElement>
            )
        })
        return (
            <AddElementForm onSubmit={this.addIngredientHandler}>
                {form}
                <Button
                    disabled={!this.state.formIsValid}
                    >
                    SUBMIT
                </Button>
            </AddElementForm>
        )
    }

    render() {
        let ingredientForm = <Spinner />
        if (!this.props.loading) {
            let dropdownMenus = this.dropdownMenuCreator()
            // let dropdownMenus = this.props.selectorInit ? null : this.dropdownMenuCreator()
            let newItemForm = this.state.formType === 'add' ? this.addItemForm() : null
            console.log('[IngredientForm] this.state.formControls: ', this.state.formControls)
            
            ingredientForm = (
                <ContentBlock>
                    <Header>Add A New Element</Header>
                    {dropdownMenus}
                    {newItemForm}
                </ContentBlock>
            )
        }
        return (
            <React.Fragment>
                {ingredientForm}
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
