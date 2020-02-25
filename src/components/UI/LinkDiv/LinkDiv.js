import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 90%;
    max-width: 60rem;
    height: 7rem;
    box-shadow: ${({ theme }) => theme.shadow.component};
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.white[0]};

    @media (max-width: ${({ theme }) => theme.media.tablet} ) {
        max-width: 45rem;
    }
`

const linkDiv = props => {
    return (
        <Wrapper
            className={props.className}>
            {props.children}
        </Wrapper>
    )
}

export default linkDiv
