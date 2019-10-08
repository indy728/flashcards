import React from 'react'
import styled from 'styled-components'
import Button from '../../../Button/Button'

const Wrapper = styled(Button)`
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 1px;
    border: 1px solid ${props => props.theme.palette.grayscale[2]};
    box-shadow: 2px 2px ${props => props.theme.palette.grayscale[0]};

    :hover {
        background-color: ${props => props.theme.palette.secondary[2]};
        border: 1px solid ${props => props.theme.palette.white[2]};
        /* transform: scale(1.05) translateY(-1rem);
        transition: .1s all; */
    }

    :active {
        /* transform: scale(1) translateY(-.65rem); */
    }
`

const addAttribute = (props) => {
    return (
        <Wrapper 
            className="AddAttribute"
            clicked={props.added}>
            {props.children}
        </Wrapper>
    )
}

export default addAttribute
