import React, { Component } from 'react'
import axios from '../../axios-flashcards'
import ContentBlock from '../UI/ContentBlock/ContentBlock'
import Spinner from '../UI/Spinner/Spinner'
import styled from 'styled-components'
import Button from '../UI/Button/Button'
import IngredientTierForm from './IngredientTierForm/IngredientTierForm'
import { database } from '../../store/actions/firebase'
import { loadPartialConfig } from '@babel/core'


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
        tiers:[
            'ingredients',
            'categories',
            'products'
        ],
        selector: [],
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
        const spirits = ings.child('spirits')
        ings.once('value', snap => {
            this.setState({ingredients: snap.val(), loading: false})
        
        })
        .then(() => {
            console.log(this.state.ingredients)})
    }

    selectChangedHandler = (event, selectIdentifier) => {
        console.log(event.target.value)
        this.setState({editor: event.target.value})
        let selector = [...this.state.selector]
        selector.push(event.target.value)
        this.setState({selector: selector})
        console.log(selector)
        console.log(this.state.selector)
    }

    objectFormCreator = (obj, tier) => {
        const newObj = {...obj}
        const objKeys = Object.keys(newObj)
        const options = objKeys.map(key => <option key={key} value={key}>{key}</option>)
        const forms = []
        while (tier >= 0) {
            forms.unshift(
                <select name={this.state.tiers[tier]} onChange={this.selectChangedHandler}>
                    <option hidden>-- select an option--</option>
                    {options}
                    <option value="edit">Edit ingredient list</option>
                </select>
            )
            tier = tier - 1
        }
        return forms
    }

    render() {
        let window = <Spinner />
        if (!this.state.loading) {
            const ingredientForm = this.objectFormCreator(this.state.ingredients, this.state.tierLevel)
            
            // let editor = null
            // if (this.state.editor === 'edit') {
            //     editor = <IngredientTierForm
            //         list={ingredientTypes} />
            // }
            window = (
                <ContentBlock>
                    <AddElementForm>
                        {ingredientForm}
                        <Button
                            clicked={this.addIngredientHandler}>SUBMIT</Button>
                        {/* {editor} */}
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
