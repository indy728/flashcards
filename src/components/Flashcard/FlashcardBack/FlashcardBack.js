import React from 'react'
import styled from 'styled-components'
import CardFace from '../../UI/CardFace/CardFace'
import { qtyFloatToString } from '../../../shared/stringUtility'

const Wrapper = styled(CardFace)`
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
    `

const Bullet = styled.div`
    height: 5rem;
    margin-top: 2px;
    padding-top: 1.1rem;
    font-size: 1.4rem;
    text-align: left;
    
    align-items: flex-start;
    `

const Bullets = styled.div`
    height: calc(100% - 2.1rem - 4.4rem);
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

const FlashcardBackInstructions = styled.div`
    height: 10.4rem;
`

const flashcardBack = props => {
    const { elements } = props
    const { measurements, garnishes, glassware } = elements

    console.log('[FlashcardBack] props: ', props)
    const cocktailMeasurements = measurements.map((measurement, i) => {
        return (
            <Bullet className="bullet cardText" key={measurement + i}>
                • {measurement}
            </Bullet>
        )
    })

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
            <div>
                {garnishes}
                {glassware}
            </div>
            <FlashcardBackInstructions>
                {props.instructions.instruction}
            </FlashcardBackInstructions>
        </Wrapper>
    )
}

export default flashcardBack
