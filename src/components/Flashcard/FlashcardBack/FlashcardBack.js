import React, { Component } from 'react'
import styled from 'styled-components'
import CardFace from '../../UI/CardFace/CardFace'

const Wrapper = styled(CardFace)`
    min-height: 52rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`

const Bullet = styled.div`
    width: 80%;
    padding: 2rem;
    font-size: 2.4rem;
    text-align: left;
    text-transform: uppercase;
`

const flashcardBack = props => {
    const { ingredients, instructions, glassware, garnish } = props

    const ingsKeys = Object.keys(ingredients)
        const ings = ingsKeys.map(ing => {
            const ingredient = ingredients[ing]
            return (
                <Bullet>{ingredient.qty} {ingredient.name}</Bullet>
            )
        })

    return (
        <Wrapper
            className='flashcard-back'
            reveal={props.reveal} >
            {ings}
            <Bullet>Instructions: {instructions}</Bullet>
            <Bullet>Glassware: {glassware}</Bullet>
            <Bullet>Garnish: {garnish}</Bullet>
        </Wrapper>
    )
}

export default flashcardBack
