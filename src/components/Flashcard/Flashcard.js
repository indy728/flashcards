import React, { Component } from 'react'
import styled from 'styled-components'
import FlashcardFront from './FlashcardFront/FlashcardFront'
import FlashcardBack from './FlashcardBack/FlashcardBack'

const Wrapper = styled.div`
    width: 100%;
    display: block;
    position: relative;
    box-sizing: border-box;
    perspective: 150rem;
    -moz-perspective: 150rem;
    /* height: 52rem; */

`

class Flashcard extends Component {
    state = {
        reveal: false
    }

    clickRevealHandler = () => {
        this.setState(prevState => {
            return {reveal: !prevState.reveal}
        })
    }

    render() {
        const { name, elements, instructions, glassware, garnish } = this.props.cocktail

        

        console.log(this.state)
        return (
            <Wrapper
                className='flashcard'
                onClick={this.clickRevealHandler}>
                <FlashcardFront
                    className='flashcard-front'
                    reveal={!this.state.reveal}
                    name={name}
                    />
                <FlashcardBack
                    className='flashcard-back'
                    reveal={this.state.reveal}
                    elements={elements}
                    // instructions={instructions}
                    // glassware={glassware}
                    // garnish={garnish}
                    >
                </FlashcardBack>
            </Wrapper>
        )
    }
}

export default Flashcard
