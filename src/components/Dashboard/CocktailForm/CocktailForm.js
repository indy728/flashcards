import React, { Component } from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 4rem;
`

const cocktailForm = props => {
    const attributes = {...props.attributes}
    const attributeKeys = Object.keys(attributes)
    const transformedAttributes = attributeKeys.map(key => {
        const attrObj = attributes[key]
        for (let i in attrObj) {
            return (
                <Attribute
                    className={i}
                    header={attrObj[i].label}
                    quantity={attrObj[i].quantity}
                    remove={attrObj[i].removeable}
                    key={key}
                    index={key}
                    changed={props.inputChanged}
                    removeAttribute={props.removeAttribute}/>
            )
        }
    })

    return (
        <Wrapper>
            {transformedAttributes}
        </Wrapper>
    )
}

export default cocktailForm
