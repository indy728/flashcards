import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin-top: 6rem;
    background-color: ${props => props.theme.palette.grayscale[5]};
    border: ${props => props.theme.palette.grayscale[2]};
    box-shadow: 2px 2px ${props => props.theme.palette.grayscale[0]};
    border-radius: 2px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`

const contentBlock = (props) => {
    return (
        <Wrapper className={props.className}>
            {props.children}
        </Wrapper>
    )
}

export default contentBlock
