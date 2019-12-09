import React from 'react'
import styled from 'styled-components'
import Input from '../../../../UI/Input/Input'

const Wrapper = styled(Input)`
    width: ${props => props.width ? props.width : '100%'};
    margin: ${props => props.margin ? props.margin : '0'};
    padding: 0;
    font-size: 1.4rem;
    
    input {
        padding: .8rem 1.2rem;
    }
`

const attributeInput = (props) => {
    return (
        <Wrapper
            {...props}
            >
        </Wrapper>
    )
}

export default attributeInput
