import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 6rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 2.6rem;
    font-weight: bold;
    font-family: ${props => props.theme.fonts.header};
    /* display: flex;
    align-items: center;
    justify-content: center; */
`

const ingredientTierHeader = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default ingredientTierHeader
