import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import AttributeInput from './AttributeInput/AttributeInput'

const Wrapper = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const newAttribute = props => {
    return (
        <Wrapper>
            <AttributeInput {...props}/>
            <Button>
                REMOVE
            </Button>
        </Wrapper>
    )
}

export default newAttribute
