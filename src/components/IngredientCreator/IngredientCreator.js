import React, { Component } from 'react'
import axios from '../../axios-flashcards'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { database } from '../../store/actions/firebase'
import { updateObject } from '../../shared/utility'


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
        ingredients: null,
        selector: ['ingredients'],
        tier: 0,
        loading: true,
        addProduct: false,
        editList: false,
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
        }
    }

    componentDidMount() {
        const rootRef = database.ref()
        const ings = rootRef.child('ingredients')

        ings.once('value', snap => {
            this.setState({ingredients: snap.val(), loading: false})
        })
    }

    selectChangedHandler = (event) => {
        const selection = event.target.value
        let tier = this.state.tier
        const selector = [...this.state.selector]
        const index = selector.indexOf(event.target.name)

        if (event.target.value === 'add') {
            this.setState({
                addProduct: true,
                editList: false,
                tier: index,
            })
            return
        }
        if (event.target.value === 'edit') {
            this.setState({
                addProduct: false,
                editList: true,
                tier: index,
            })
            return
        }


        if (index < tier) {
            const newSelector = [selector.slice(0, index + 1)]
            newSelector.push(selection)
            console.log(newSelector)
            this.setState({
                selector: newSelector,
                tier: index,
                addProduct: false,
                editList: false
            })
        } else {
            if (tier === 2) {
                selector[2] = selection
                this.setState({
                    selector: selector,
                    addProduct: false,
                    editList: false
                })
            } else {
                selector.push(selection)
                tier = tier + 1
                this.setState({
                    selector: selector,
                    tier: tier,
                    addProduct: false,
                    editList: false
                })
            }
        }
    }

    objectFormCreator = () => {
        const ingredients = {...this.state.ingredients}
        const dropdowns = []
        const tier = this.state.tier
        const selector = [...this.state.selector]

        console.log(this.state.tier)

        for (let i = 0 ; i <= tier && i < 2 ; i++) {
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
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        let formIsValid = true
        for (let inputIdentifier in controls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        }

        this.updateControlsAndFormValidity(updatedControls, formIsValid)
    }

    render() {
        let window = <Spinner />
        if (!this.state.loading) {
            const formMenus = this.objectFormCreator()
            // const newItemForm = this.addContentCreator()

            const formElementsArray = []
            const formElementsObj = {...this.state.ingredientControls}
           
            for (let key in formElementsObj) {
                formElementsArray.push({
                    id: key,
                    config: formElementsObj[key],
                })
            }
            let form = formElementsArray.map(formElement => {
                if (this.state.tier > 0 && formElement.id === 'ingredient') {
                    // const ingredientControls = {...this.state.ingredientControls}
                    // const newIngredientControls = updateObject(ingredientControls, {
                    //     ingredient: updateObject(ingredientControls['ingredient'], {
                    //         value: this.state.selector[1],
                    //         valid: true,
                    //         touched: true
                    //     })
                    // })
                    // this.setState({ingredientControls: newIngredientControls})
                    return null
                }
                if (this.state.tier > 1 && formElement.id === 'category') return null
                console.log(this.state.ingredientControls.ingredient)
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
            
            // let editor = null
            // if (this.state.editor === 'edit') {
            //     editor = <IngredientTierForm
            //         list={ingredientTypes} />
            // }
            window = (
                <ContentBlock>
                    {formMenus}
                    <AddElementForm>
                        {form}
                        <Button
                            clicked={this.addIngredientHandler}>SUBMIT</Button>
                        {/* {editor} */}
                    </AddElementForm>
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

export default IngredientCreator
