import React from 'react'
import styled from 'styled-components'
import Input from '../../Input/Input'

const Wrapper = styled(Input)`

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
