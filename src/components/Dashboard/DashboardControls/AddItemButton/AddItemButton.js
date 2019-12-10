import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 2.8rem;
    padding: 0 0.8rem;
    padding-left: ${props => props.level ? props.level * .8 + .8 + 'rem' : '.8rem'};
    font-size: 1.4rem;
    border-radius: 3px;
    background-color: ${props => props.theme.palette.white[2]};
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const addItemButton = props => {
  return (
    <Wrapper
        {...props}
        >
        {props.children}
    </Wrapper>
  )
}

export default addItemButton
