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
    border: 1px solid ${props => props.invalid ? "red" : "#ccc"};
    background-color: ${props => props.invalid ? "rgb(250, 157, 157)" : "white"};
    font: inherit;
    padding: 6px 10px;
    display: block;
    box-sizing: border-box;

    :focus {
        outline: none;
        background-color: #ccc;
    }
`

const input = (props) => {
    let inputElement = null

    inputElement = <Input
                        className={props.className}
                        {...props.elementConfig}
                        value={props.value}
                        invalid={props.invalid && props.touched}
                        onChange={props.changed} />

    return (
        <Wrapper className={props.className}>
            <Label>{props.label}</Label>
            {inputElement}
        </Wrapper>
    )
}

export default input
