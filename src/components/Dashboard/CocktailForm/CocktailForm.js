import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 4rem;
`

const cocktailForm = props => {
    const { attributes } = props
    const attributeKeys = Object.keys(attributes)
    const transformedAttributes = attributeKeys.map(key => {
        const attribute = attributes[key]
        const attributeProperties = attribute[Object.keys(attribute)[0]]
        const { type, label, removeable } = attributeProperties

        return (
            <Attribute
                key={type + key}
                index={key}
                type={type}
                header={label}
                remove={removeable}
                changed={props.inputChanged}
                removeAttribute={props.removeAttribute}/>
        )
    })

    return (
        <Wrapper>
            {transformedAttributes}
        </Wrapper>
    )
}

export default cocktailForm
