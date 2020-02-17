import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    
    @media (max-width: ${({ theme }) => theme.media.tablet}) {
        height: 100%;
    }
    
    @media (min-width: ${({ theme }) => theme.media.tablet }) {
        width: 80rem;
        margin: 6rem 0;
        border: 1px solid ${({ theme }) => theme.palette.primary[2]};
        box-shadow: 1px 1px ${({ theme }) => theme.palette.grayscale[0]};
        border-radius: 1px;
        background-color: ${({ theme }) => theme.palette.grayscale[5]};
    }
`

const contentBlock = (props) => {
    return (
        <Wrapper className={props.className}>
            {props.children}
        </Wrapper>
    )
}

export default contentBlock
