import React, { Component } from 'react'
import axios from '../../axios-flashcards'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { updateObject } from '../../shared/utility'

const AddElementForm = styled.form`
    width: 80%;
    margin: 1rem 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

class IngredientCreator extends Component {
    state = {
        ingredients: null,
        tier: '',
        loading: true,
        editor: ''
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data, loading: false, tier: 'ingredients'})
            })
            .catch(er => console.log(er));
    }

    selectChangedHandler = (event, selectIdentifier) => {
        console.log(event.target.value)
        this.setState({editor: event.target.value})
    }

    render() {
        let window = <Spinner />
        if (!this.state.loading) {
            const ingredientObj = this.state.ingredients
            const ingredientTypes = Object.keys(ingredientObj)
            // const ingredientTypes = []
            // for (let key in ingredientsObj) {
            //     console.log(ingredientsObj[key]);
                
            //     ingredientTypes.push({
            //         id: key,
            //         value: ingredientsObj[key]
            //     })
            // }

            let options = ingredientTypes.map(ing => {
                return (
                    <option value={ing}>{ing}</option>
                )
            })

            let form = (
                <select
                    onChange={this.selectChangedHandler}>
                    <option disabled selected value> -- select an ingredient type --</option>
                    {options}
                    <option value="edit">Edit ingredient list</option>
                </select>
            )
            
            let editor = null
            if (this.state.editor === 'edit') {
                editor = <IngredientTierForm
                    list={ingredientTypes} />
            }
            window = (
                <ContentBlock>
                    <AddElementForm>
                        {form}
                        <Button
                            clicked={this.addIngredientHandler}>SUBMIT</Button>
                        {editor}
                    </AddElementForm>
                </ContentBlock>
            )
            console.log(this.state.ingredients);
            
        }
        return (
            <React.Fragment>
                {window}
            </React.Fragment>
        )
    }
}

export default IngredientCreator
