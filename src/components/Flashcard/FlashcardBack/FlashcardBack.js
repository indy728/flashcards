import React from 'react'
import styled from 'styled-components'
import CardFace from '../../UI/CardFace/CardFace'

const Wrapper = styled(CardFace)`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* justify-content: center; */
    padding: 1rem 2rem;

    /* > div {
        width: 100%;
    } */

    .cardText {
        display: flex;
        justify-content: flex-start;
    }

    > :not(:first-child) {
        font-size: 1.4rem;
    }
`

const Bullet = styled.div`
    height: 2.4rem;
    margin-top: 2px;
    padding-top: 1.1rem;
    
    text-align: left;
    
    align-items: flex-start;
    `

const Bullets = styled.div`
    /* height: calc(100% - 2.1rem - 4.4rem); */
    width: 100%;
    flex: 1;
    margin-top: 2.1rem;
    column-count: 2;
    column-fill: auto;
    column-gap: 3.5rem;
`

const FlashCardBackHeader = styled.div`
    height: 4.4rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    font-size: 2.4rem;
    text-transform: capitalize;
`

const FlashcardBackSpecialClass = styled.div`
padding-top: 1rem;
height: 2.6rem;
`

const FlashcardBackInstructions = styled.div`
padding-top: 1rem;
    height: 5.2rem;
`

const flashcardBack = props => {
    const { elements } = props
    const { measurements, garnishes, glassware } = elements
    let cocktailGarnish = null
    let cocktailGlassware= null

    console.log('[FlashcardBack] props: ', props)
    const cocktailMeasurements = measurements.map((measurement, i) => {
        return (
            <Bullet className="bullet cardText" key={measurement + i}>
                • {measurement}
            </Bullet>
        )
    })
    if (garnishes.length > 0) {
        cocktailGarnish = (
            <FlashcardBackSpecialClass
                className='flashcardBackSpecialClass--garnishes'
                >
                    Garnish: {garnishes.join(' and/or ')}
            </FlashcardBackSpecialClass>
        )
    }
    if (glassware.length > 0) {
        cocktailGlassware = (
            <FlashcardBackSpecialClass
                className='flashcardBackSpecialClass--glassware'
                >
                    Glassware: {glassware.join(' or ')}
            </FlashcardBackSpecialClass>
        )
    }
    

    return (
        <Wrapper
            className='flashcard-back'
            reveal={props.reveal} >
            <FlashCardBackHeader className="cardHeader cardText">{props.name.toLowerCase()}</FlashCardBackHeader>
            <Bullets>
                {cocktailMeasurements}
            </Bullets>
            {/* {cocktailGarnish}
            {cocktailGlassware}
            {cocktailInstructions} */}
            {cocktailGarnish}
            {cocktailGlassware}
            <FlashcardBackInstructions>
                Instructions: {props.instructions.instruction}
            </FlashcardBackInstructions>
        </Wrapper>
    )
}

export default flashcardBack
