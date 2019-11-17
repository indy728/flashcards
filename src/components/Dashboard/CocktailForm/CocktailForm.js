import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 2rem;
`

const cocktailForm = props => {
    return (
        <Wrapper>
            <Attribute 
                className='name'
                label='drink name'
                key='name'/>
        </Wrapper>
    )
}

export default cocktailForm
