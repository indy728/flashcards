import React, { Component } from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'

const Wrapper = styled.div`
    width: 55rem;
    padding: 2rem;
`

const cocktailForm = props => {
    // state = {
    //     attributes: {
    //         drinkName: {
    //             label: 'Drink Name',
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: '',
    //                 autocomplete: '',
    //             },
    //             value: '',
    //             removeable: false,
    //             validation: {
    //                 required: true,
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //     },
    //     drinkControls: {
    //         name: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: '',
    //                 autocomplete: '',
    //             },
    //             value: '',
    //             removeable: false,
    //             validation: {
    //                 required: true,
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         ingredient: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: '',
    //                 autocomplete: '',
    //             },
    //             value: '',
    //             removeable: true,
    //             validation: {
    //                 required: true,
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         instructions: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'textarea',
    //                 placeholder: '',
    //                 autocomplete: '',
    //             },
    //             value: '',
    //             removeable: true,
    //             validation: {
    //                 required: true,
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //     }
    // }

    // render() {
        const attributes = {...props.attributes}
        const attributeKeys = Object.keys(attributes)
        const transformedAttributes = attributeKeys.map(key => {
            const attrObj = attributes[key]
            for (let i in attrObj) {
                return(
                    <Attribute
                        className={i}
                        label={attrObj[i].label}
                        remove={attrObj[i].removeable}
                        key={key}
                        index={key}
                        removeAttribute={props.removeAttribute}/>
                    )}
            }
        )

        return (
            <Wrapper>
                {transformedAttributes}
            </Wrapper>
        )
    // }
}

export default cocktailForm
