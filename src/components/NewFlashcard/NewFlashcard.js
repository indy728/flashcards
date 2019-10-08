import React from 'react'
import styled from 'styled-components'
import AttributeInput from './AttributeInput/AttributeInput'

const Wrapper = styled.form`

`

const newFlashcard = (props) => {

    const transformedAttributes = Object.keys(props.attributes)
        .map(attrKey => {
            return [...Array(props.attributes[attrKey].quantity)].map((_, i) => (
                    <AttributeInput
                        className={attrKey}
                        label={props.attributes[attrKey].text}
                        key={attrKey + i}/>
                )
            )
        })

    return (
        <Wrapper>
            <AttributeInput
                className="drinkName"
                label="Drink Name"
                key="drinkName" />
            {transformedAttributes}
        </Wrapper>
    )
}

export default newFlashcard
