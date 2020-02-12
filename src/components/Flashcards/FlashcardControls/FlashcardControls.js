import React from 'react'
import styled from 'styled-components'
import { Sprite } from '../../UI'

const Wrapper = styled.div`
    height: 100%;
    width: 10rem;
    padding: 2rem 1rem;
    max-width: 10%;
    background-color: ${props => props.theme.palette.transparent[0]};
    display: flex;
    align-items: center;
    justify-content: center;
`

const SpriteContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: white;
    }
`

const flashcardControls = props => {
  return (
    <Wrapper
        className={props.className}
        onClick={props.clicked}
        >
        <SpriteContainer>
            <Sprite 
                className='flashcard--control__sprite'
                height='15rem'
                spriteName={props.buttonSymbol}
                />
        </SpriteContainer>
    </Wrapper>
  )
}

export default flashcardControls
