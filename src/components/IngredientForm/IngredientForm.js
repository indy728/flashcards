import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Header from '../UI/Header/Header'
import Select from '../UI/Select/Select'

import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { updateObject } from '../../shared/objectUtility'
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

const AddElementInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const AddElementInput = styled(Input)`
    /* flex: 1; */
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
    attributes: {},
    validation: {
        required: true,
    },
    valid: false,
    touched: false
}

const ignored = ["name", "rank"]

const attributeOptions = [
    { "value": "qty", "text": "quantity / count" },
    { "value": "text", "text": "text instructions" },
]

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
                example: 'London Dry Gin',
                attributes: {
                    qty: true,
                    text: false
                }
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
            const selector = this.state.selector.concat(this.props.selectorInit)
            const formControls= this.setFormControls([this.state.groupControls[selector.length - 1]])

            this.setState({
                formControls,
                selector,
                formType: 'add'
            })
        }
    }

    setFormControls = (controlArray) => {
        let formControls = {}

        controlArray.forEach(control => {
            const { name, placeholder, example } = control

            formControls = updateObject(formControls, {
                [name]: updateObject(controlsInit, {
                    elementConfig: updateObject(controlsInit.elementConfig, {
                        placeholder: placeholder + ` (i.e.: '${example}')`
                    }),
                    attributes: control.attributes || {}
                })
            })
        })
        return formControls
    }

    selectChangedHandler = event => {
        const { selector } = this.state
        const tier = selector.length - 1
        const selection = event.target.value
        const index = selector.indexOf(event.target.name)

        if (tier > 2) {
            this.setState({
                formControls: this.setFormControls(this.state.productControls),
                formType: 'add'
            })
        } else if (event.target.value === 'add' || event.target.value === 'edit') {
            const groupControls = [ ...this.state.groupControls ]
            
            this.setState({
                formControls: this.setFormControls([groupControls[index]]),
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

    checkboxChangedHandler = event => {
        const { value } = event.target
        let { formControls } = this.state

        formControls.item.attributes[value] = !formControls.item.attributes[value]
        this.setState({ formControls })
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

    setNode = (selector, node, depth = 0) => {
        if (depth < selector.length - 1) {
            node = node[selector[depth + 1]]
            return this.setNode(selector, node, depth + 1)
        } else {
            return node
        }
    }

    addIngredientHandler = event => {
        event.preventDefault()

        const { formControls, groupControls, selector } = this.state
        const { ingredients } = this.props

        const key = groupControls[selector.length - 1].name
        const id = idTransform(formControls[key].value)
        const name = nameTransform(formControls[key].value)
        const levelKeys = Object.keys(this.setNode(selector, ingredients)).filter(key => {
            return ignored.indexOf(key) === -1
        })
        const newItem = {
            [id]: {
                name,
                rank: levelKeys.length
            }
        }

        if (key === "item") {
            newItem[id] = updateObject(newItem[id], {
                attributes: formControls[key].attributes
            })
        }

        let node = this.setNode(selector, ingredients)

        if (Object.keys(node).indexOf(Object.keys(newItem)[0].toLowerCase()) === -1) {
            node = updateObject(node, newItem)
            this.props.onAddIngredient(node, selector, id)
            this.setState({
                selector: ['ingredients'],
                formType: 'select',
                formControls: {},
                formIsValid: false
            })
        } else {
            //  NEED A POPUP WARNING HERE
            // DUPLICATE SHOULD LOOK AT INDEX INSTEAD AND RETURN PATH TO DUPE
            console.log('Duplicate of something')
            this.clearInputs()
        }
        if (this.props.selectorInit) {
            this.props.closeModal()
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
        const { formControls } = this.state
        const formElementsArray = []
    
        for (let key in formControls) {
            formElementsArray.push({
                id: key,
                config: formControls[key],
            })
        }

        let form = formElementsArray.map(formElement => {
            let addButton = null;
            let checkboxes = null;

            if (formElement.id !== 'item') {
                addButton = (
                    <AddFormElement>
                        Add Item To {formElement.config.value}
                    </AddFormElement>
                )
            } else {
                checkboxes = (
                    <div>
                        {
                            attributeOptions.map(attributeOption => {
                                return (
                                    <React.Fragment key={attributeOption.value}>
                                        <input
                                            type="checkbox"
                                            name={attributeOption.value}
                                            value={attributeOption.value}
                                            onClick={this.checkboxChangedHandler}
                                            defaultChecked={attributeOption.value === 'qty'}
                                            />
                                        {attributeOption.text}
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                )
            }
            return (
                <FormElement key={formElement.id}>
                    <AddElementInputContainer>
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
                            {/* {attribute} */}
                    </AddElementInputContainer>
                        {checkboxes}
                        {addButton}
                </FormElement>
            )
        })
        return (
            <AddElementForm onSubmit={this.addIngredientHandler}>
                {form}
                <Button
                    disabled={!this.state.formIsValid}
                    // clicked={this.props.closeModal}
                    >
                    SUBMIT
                </Button>
            </AddElementForm>
        )
    }

    render() {
        let ingredientForm = <Spinner />
        if (!this.props.loading) {
            let dropdownMenus = this.props.selectorInit ? null : this.dropdownMenuCreator()
            let newItemForm = this.state.formType === 'add' ? this.addItemForm() : null
            
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
        onAddIngredient: (ingredientNode, dbRefArray, tier, id) => dispatch(actions.addIngredient(ingredientNode, dbRefArray, tier, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCreator)
