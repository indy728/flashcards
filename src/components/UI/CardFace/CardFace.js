import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    transition: all .8s ease;
    /* position: absolute;
    top: 0;
    left: 0; */
    /* width: 80rem; */
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.15);
    background-color: ${props => props.theme.palette.primary[0]};
    color: ${props => props.theme.palette.secondary[0]};

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5rem;
    
    transform: ${props => props.reveal ? 'rotateY(0)' : 'rotateY(180deg)'};
`

const cardFace = props => {return <Wrapper {...props} />}

export default cardFace
