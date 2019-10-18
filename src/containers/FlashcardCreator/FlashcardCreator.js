import React, { Component } from 'react'
import styled from 'styled-components'
import NewFlashcard from '../../components/NewFlashcard/NewFlashcard'
import AttributeControls from '../../components/NewFlashcard/AttributeControls/AttributeControls'
import axios from '../../axios-flashcards'
import Button from '../../components/UI/Button/Button'

const Wrapper = styled.div`
    width: 80%;
    background: ${props => props.theme.palette.grayscale[5]};
    display: flex;
    flex-flow: column;
    align-items: center;
`

class FlashcardCreator extends Component {
    state = {
        attributes: {
            ingredient: {
                quantity: 0,
                type: "text",
                text: "Ingredient Name"
            },
            glass: {
                quantity: 0,
                type: "select",
                text: "Type of Glassware"
            },
            garnish: {
                quantity: 0,
                type: "text",
                text: "Garnish"
            },
            ice: {
                quantity: 0,
                type: "select",
                text: "Type of Ice"
            },
            instructions: {
                quantity: 0,
                type: "textarea",
                text: "Instructions"
            },
            picture: {
                quantity: 0,
                type: "input",
                text: "Picture"
            },
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => console.log(res.data))
            .catch(er => console.log(er))
    }
    // change to bool for some?
    addAttributeHandler = (type) => {
        const oldCount = this.state.attributes[type].quantity
        const updatedCount = oldCount + 1
        const updatedAttributes = {
            ...this.state.attributes
        }
        updatedAttributes[type].quantity = updatedCount
        this.setState({attributes: updatedAttributes})
    }
  
    removeAttributeHandler = (type) => {
        const oldCount = this.state.attributes[type]
        const updatedCount = oldCount === 0 ? 0 : oldCount - 1
        const updatedAttributes = {
            ...this.state.attributes
        }
        updatedAttributes[type] = updatedCount
        this.setState({attributes: updatedAttributes})
    }

    addIngredientHandler = () => {
    }

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <NewFlashcard attributes={this.state.attributes}/>
                    <AttributeControls 
                        attributeAdded={this.addAttributeHandler}
                        attributeRemoved={this.removeAttributeHandler}
                        />
                </Wrapper>
            </React.Fragment>
        )
    }
}

export default FlashcardCreator
