import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const Wrapper = styled.div`
    width: 80%;
    background: ${props => props.theme.palette.grayscale[5]};
    display: flex;
    flex-flow: column;
    align-items: center;
`

const Buttons = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
`

const buttonList = [
    "Ingredient", "Glass", "Garnish", "Ice", "Instructions"
]

class FlashcardCreator extends Component {
    state = {
        attributes: [ 
            {label: "Name", text: "Drink Name"},
            {label: "Mix", text: "Mixing Instructions"},
        ]
    }

    addAttributeHandler = () => {
        const attributes = this.state.attributes
        const newAttributes = attributes.push
    }

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <form>
                        {this.state.attributes.map((attr, i) => (
                            <Input
                                label={attr.text}
                                key={attr.label + i}/>
                        ))}
                        {/* <Input label="Drink Name" />
                        <Input label="Mix" /> */}
                    </form>
                    <Buttons>
                        {buttonList.map((btn, i) => (
                            <Button key={btn + i}>{btn}</Button>
                        ))}
                        {/* // <Button>Ingredient</Button>
                        // <Button>Glass</Button>
                        // <Button>Garnish</Button>
                        // <Button>Ice</Button>
                        // <Button>Instructions</Button> */}
                    </Buttons>
                </Wrapper>
            </React.Fragment>
        )
    }
}

export default FlashcardCreator
