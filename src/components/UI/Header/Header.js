import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    height: 8rem;
    margin: 5px 0;
    font-size: 3.6rem;
    font-weight: bold;
    font-family: ${props => props.theme.fonts.header};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
`

const header = props => {
    return (
        <Wrapper
            className={props.className}>
            {props.children}
        </Wrapper>
    )
}

export default header
