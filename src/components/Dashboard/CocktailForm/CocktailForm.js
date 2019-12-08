import React, { Component } from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 4rem;
`

const cocktailForm = props => {
    const { attributes, ingredients } = props
    const attributeKeys = Object.keys(attributes)
    const transformedAttributes = attributeKeys.map(key => {
        const attrObj = attributes[key]
        const attrArray = []
        for (let i in attrObj) {
            const { ingredient, label, elementConfig } = attrObj[i]
            const textarea = elementConfig.type === 'textarea'
            if ( ingredient && label) {
            }

            attrArray.push(
                <Attribute
                    className={i}
                    category={i}
                    textarea={textarea}
                    header={attrObj[i].label}
                    quantity={attrObj[i].quantity}
                    remove={attrObj[i].removeable}
                    key={key}
                    index={key}
                    changed={props.inputChanged}
                    removeAttribute={props.removeAttribute}/>
            )
        }
        return attrArray
    })

    return (
        <Wrapper>
            {transformedAttributes}
        </Wrapper>
    )
}

export default cocktailForm
