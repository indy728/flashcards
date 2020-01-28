import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.15);

    background-image:
        linear-gradient(180deg, white 5rem, #F0A4A4, #F0A4A4 calc(5rem + 2px), transparent 1px),
        repeating-linear-gradient(180deg, white, white 2.5rem, #DDD, #DDD calc(2.5rem + 1px));

    /* display: flex;
    align-items: center;
    justify-content: center; */

    transform: ${props => props.reveal ? 'rotateY(0)' : 'rotateY(180deg)'};
    transition: all .8s ease;
`

const cardFace = props => {return <Wrapper {...props} />}

export default cardFace
