import React from 'react'
import styled from 'styled-components'
import Input from '../../../../UI/Input/Input'

const Wrapper = styled(Input)`
    width: 100%;
    padding: 0;
    font-size: 1.4rem;
    
    input {
        padding: .8rem 1.2rem;
    }
`

const TextArea = styled.textarea`
    width: 100%;
    padding: 0;
    font-size: 1.4rem;
    height: 20rem;
    
    input {
        padding: .8rem 1.2rem;
    }
`

const attributeInput = (props) => {
    console.log(props.textarea)
    let inputType = props.textarea ? <TextArea {...props} /> : <Wrapper {...props} /> 

    return inputType
}

export default attributeInput
