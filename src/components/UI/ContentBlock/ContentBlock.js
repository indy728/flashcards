import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80rem;
    margin: 6rem 0;
    background-color: ${props => props.theme.palette.grayscale[5]};
    border: 1px solid ${props => props.theme.palette.primary[2]};
    box-shadow: 1px 1px ${props => props.theme.palette.grayscale[0]};
    border-radius: 1px;
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
