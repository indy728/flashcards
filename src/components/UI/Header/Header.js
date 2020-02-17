import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    margin: 1rem;
    font-family: ${({ theme }) => theme.fonts.header};
    justify-content: center;
    text-transform: uppercase;
    
    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        height: 8rem;
    }
`

const header = props => {
    return (
        <Wrapper
            className={props.className || 'UI_header'}>
            <h1>
                {props.children}
            </h1>
        </Wrapper>
    )
}

export default header
