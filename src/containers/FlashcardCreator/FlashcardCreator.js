import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../../components/Input/Input'
import Attributes from '../../components/Attributes/Attributes'

const Wrapper = styled.div`
    width: 80%;
    background: ${props => props.theme.palette.grayscale[5]};
    display: flex;
    flex-flow: column;
    align-items: center;
`

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
                    <Attributes />
                </Wrapper>
            </React.Fragment>
        )
    }
}

export default FlashcardCreator
