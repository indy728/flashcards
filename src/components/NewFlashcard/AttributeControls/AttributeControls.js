import React from 'react'
import styled from 'styled-components'
import AddAttribute from './AddAttribute/AddAttribute'

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
`

const buttonList = [
    "ingredient", "glass", "garnish", "ice", "instructions", "picture"
]

const attributes = (props) => {
    return (
        <Wrapper>
            {buttonList.map((btn, i) => (
                <AddAttribute 
                    key={btn + i}
                    added={() => props.attributeAdded(btn)}>
                    {btn}
                </AddAttribute>
            ))}
        </Wrapper>
    )
}

export default attributes
