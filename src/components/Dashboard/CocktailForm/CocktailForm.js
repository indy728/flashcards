import React, { Component } from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

import Flashcard from '../../Flashcard/Flashcard'

const Wrapper = styled.div`
    width: 55rem;
    padding: 4rem;
`

const cocktailForm = props => {
    const { attributes, ingredients } = props
    const attributeKeys = Object.keys(attributes)
    const transformedAttributes = attributeKeys.map(key => {
        const attrObj = attributes[key]
        for (let i in attrObj) {
            console.log(attrObj)
            console.log(i)
            const { ingredient, label } = attrObj[i]
            if ( ingredient && label) {
                console.log(ingredients)
                console.log(label)
                console.log(ingredients[ingredient][label])
            }

            return (
                <Attribute
                    className={i}
                    category={i}
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
            <Flashcard />
        </Wrapper>
    )
}

export default cocktailForm
