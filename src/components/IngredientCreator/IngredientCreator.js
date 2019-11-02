import React, { Component } from 'react'
import axios from '../../axios-flashcards'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { database } from '../../store/actions/firebase'


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

class IngredientCreator extends Component {
    state = {
        ingredients: null,
        // tiers:[
        //     'ingredients',
        //     'categories',
        //     'products'
        // ],
        selector: ['ingredients'],
        tierLevel: 0,
        loading: true,
        editor: ''
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data, loading: false, tier: 'ingredients'})
        //     })
        //     .catch(er => console.log(er));
        const rootRef = database.ref()
        const ings = rootRef.child('ingredients')

        ings.once('value', snap => {
            this.setState({ingredients: snap.val(), loading: false})
        })
    }

    selectChangedHandler = (event) => {
        const selection = event.target.value
        let tierLevel = this.state.tierLevel
        const selector = [...this.state.selector]
        const index = selector.indexOf(event.target.name)

        if (index < tierLevel) {
            const newSelector = [selector.slice(0, tierLevel + 1)]
            this.setState({selector: newSelector, tierLevel: index})
        } else {
            if (tierLevel === 2) {
                selector[2] = selection
                this.setState({selector: selector})
            } else {
                selector.push(selection)
                tierLevel = tierLevel + 1
                this.setState({selector: selector, tierLevel: tierLevel})
            }
        }
    }

    objectFormCreator = () => {
        const ingredients = {...this.state.ingredients}
        const forms = []
        const tierLevel = this.state.tierLevel
        const selector = [...this.state.selector]

        for (let tier = 0 ; tier <= tierLevel ; tier++) {
            let obj = null

            switch(tier) {
                case (0):
                    obj = ingredients
                    break
                case (1):
                    obj = ingredients[selector[1]]
                    break
                case (2):
                    obj = ingredients[selector[1]][selector[2]]
                    break
                default:
                    obj = null
            }

            const optionKeys = Object.keys(obj)
            const options = optionKeys.map(key => <option key={key} value={key}>{key}</option>)

            forms.push(
                <IngredientDropDownSection>
                    <select name={this.state.selector[tierLevel]} onChange={this.selectChangedHandler}>
                        <option hidden>-- select an option--</option>
                        {options}
                        {/* <option value="edit">Edit ingredient list</option> */}
                    </select>
                </IngredientDropDownSection>
            )
        }
        return forms
    }

    render() {
        let window = <Spinner />
        if (!this.state.loading) {
            const ingredientForm = this.objectFormCreator()
            // const ingredientForm = this.objectFormCreator(this.state.ingredients, this.state.tierLevel)
            
            // let editor = null
            // if (this.state.editor === 'edit') {
            //     editor = <IngredientTierForm
            //         list={ingredientTypes} />
            // }
            window = (
                <ContentBlock>
                    {ingredientForm}
                    <AddElementForm>
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
