import React, { Component } from 'react'
import styled from 'styled-components'
import FlashcardFront from './FlashcardFront/FlashcardFront'
import FlashcardBack from './FlashcardBack/FlashcardBack'
import { qtyFloatToString, makePlural } from '../../shared/stringUtility'



const Wrapper = styled.div`
    width: 75rem;;
    height: 40rem;
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

    classifyElementsHandler = elements => {
        const measurements = []
        const garnishes = []
        const glassware = []
        const elementKeys = Object.keys(elements).sort((a, b) => elements[a].order > elements[b].order ? 1 : -1)
        
        elementKeys.forEach(key => {
            const element = elements[key]
            let elementStr = element.label
            if (element.qty){
                let qty = qtyFloatToString(element.qty)
                if (element.qtyType === 'count') {
                    elementStr = qty + 'x ' + element.label
                } else {
                    elementStr = qty + ' ' + element.qtyType.toLowerCase() + ' ' + element.label
                }
            }
            if (element.class === 'garnish') {
                garnishes.push(elementStr)
            } else if (element.class === 'glassware') {
                glassware.push(elementStr)
            } else {
                measurements.push(elementStr)
            }
        })
        return ({
            measurements,
            garnishes,
            glassware
        })
    }

    render() {
        const { name, elements, instructions } = this.props.cocktail
        const elementsByClass = this.classifyElementsHandler(elements) 
        

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
                    name={name}
                    elements={elementsByClass}
                    instructions={instructions}
                    >
                </FlashcardBack>
            </Wrapper>
        )
    }
}

export default Flashcard
