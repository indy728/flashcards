import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 0;
`

const ItemName = styled.div`
    width: 60%;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: ${props => props.theme.fonts.header};
    letter-spacing: 1.1px;
`

const Buttons = styled.div`
    width: 40%;
    justify-content: space-around;
`

const ingredientTierItem = (props) => (
    <Wrapper>
        <ItemName>
            {props.children}
        </ItemName>
        <Buttons>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </Buttons>
    </Wrapper>
)

export default ingredientTierItem
