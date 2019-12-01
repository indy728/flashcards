import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    perspective: 150rem;
    -moz-perspective: 150rem;
    position: relative;
    height: 52rem;

    :hover .flashcard-front{
        transform: rotateY(180deg);
    }
    :hover .flashcard-back {
        transform: rotateY(0deg);
    }
`

const FlashcardSide = styled.div`
    height: 52rem;
    transition: all .8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.15);

`

const FlashcardFront = styled(FlashcardSide)`
    background-color: blueviolet;

`

const FlashcardBack = styled(FlashcardSide)`
    transform: rotateY(180deg);
    background-color: orangered;

`

class Flashcard extends Component {
    state = {
        reveal: false
    }

    render() {
        return (
            <Wrapper className='flashcard'>
                <FlashcardFront className='flashcard-front' />
                <FlashcardBack className='flashcard-back' />
            </Wrapper>
        )
    }
}

export default Flashcard
