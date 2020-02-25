import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    flex: 1;
    justify-content: space-evenly;
    
    @media (max-width: ${({ theme }) => theme.media.tablet}) {
    }
    
    @media (min-width: ${({ theme }) => theme.media.tablet }) {
        /* margin: 5%; */
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
