import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    padding: 2rem;
`

const Label = styled.label`
    font-weight: bold;
    margin-bottom: .8rem;
`

const Input = styled.input`
    outline: none;
    border: 1px solid #ccc;
    background-color: white;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 80%;

    :focus {
    outline: none;
    background-color: #ccc;
    }
`

const input = (props) => {
    let inputElement = null

    inputElement = <Input 
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />

    return (
        <Wrapper>
            <Label>{props.label}</Label>
            {inputElement}
        </Wrapper>
    )
}

export default input
