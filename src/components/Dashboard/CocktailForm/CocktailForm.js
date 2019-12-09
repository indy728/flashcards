import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 2rem 4rem;
`

const cocktailForm = props => {
    const transformedAttributes = props.attributes.map((key,i) => {
        const { type, label, removeable } = key

        return (
            <Attribute
                key={type + i}
                index={i}
                type={type}
                header={label}
                remove={removeable}
                changed={props.inputChanged}
                removeAttribute={props.removeAttribute}/>
        )
    })

    return (
        <Wrapper className='cocktailForm' >
            {transformedAttributes}
        </Wrapper>
    )
}

export default cocktailForm
