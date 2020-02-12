import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Flashcard from './Flashcard/Flashcard'
import FlashcardControls from './FlashcardControls/FlashcardControls'

const Wrapper = styled.div`
    width: 100%;
    height: 50rem;
    max-height: 100%;
    /* z-index: 500; */
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    display: flex;
`

const SlideshowFeature = styled.div`
    flex: 1;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    /* > * {
        transform: ${props => `translateX(calc(-100% * ${props.index}))`};
    } */
    /* background-color: orange; */
`

class Flashcards extends Component {

    render() {
        const { cocktails, stack, flashcards } = this.props
        const flashcardArray = []

        stack.pool.forEach(id => {
            flashcardArray.push(
                <Flashcard
                    key={id}
                    cocktail={cocktails[id]}
                    />
            )
        })
        const featureFlashcard = flashcardArray[flashcards.flashcardsIndex]

        return (
            <Wrapper
                className='slideshow'
                >
                <FlashcardControls
                    className='slideshow--control-back'
                    buttonSymbol='chevron-left'
                    clicked={() => this.props.incrementFlashcardIndex(-1)}
                    />
                <SlideshowFeature>
                    {featureFlashcard}
                </SlideshowFeature>
                <FlashcardControls
                    className='slideshow--control-forward'
                    buttonSymbol='chevron-right'
                    clicked={() => this.props.incrementFlashcardIndex(1)}
                    />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        stack: state.learning.stack,
        flashcards: state.learning.flashcards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementFlashcardIndex: i => dispatch(actions.incrementFlashcardIndex(i))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards)
