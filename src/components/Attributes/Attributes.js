import React from 'react'
import styled from 'styled-components'
import AddAttribute from './AddAttribute/AddAttribute'

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
`

const buttonList = [
    "Ingredient", "Glass", "Garnish", "Ice", "Instructions"
]

const attributes = (props) => {
    return (
        <Wrapper>
            {buttonList.map((btn, i) => (
                <AddAttribute key={btn + i}>{btn}</AddAttribute>
            ))}
        </Wrapper>
    )
}

export default attributes
