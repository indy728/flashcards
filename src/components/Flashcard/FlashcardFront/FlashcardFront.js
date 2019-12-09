import React from 'react'
import styled from 'styled-components'
import CardFace from '../../UI/CardFace/CardFace'

const Wrapper = styled(CardFace)`
    height: 100%;
`

const Name = styled.div`
    width: 100%;
    padding: 2rem;
    font-size: 4.8rem;
    text-align: center;
    text-transform: capitalize;
`

const flashcardFront = props => {
    return (
        <Wrapper 
            className='flashcard-front'
            reveal={props.reveal} >
            <Name>{props.name.toLowerCase()}</Name>
        </Wrapper>
    )
}

export default flashcardFront
