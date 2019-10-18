import React from 'react'
import styled from 'styled-components'
import IngredientTierItem from './IngredientTierItem/IngredientTierItem'

const Wrapper = styled.div`
    width: 80%;
    padding: 2rem;
`

const ingredientTierForm = (props) => {
    let editButtons = props.list.map(item => {
        return (
            <IngredientTierItem>{item}</IngredientTierItem>
        )
    })
    return (
        <Wrapper className={props.className}>
            {editButtons}
        </Wrapper>
    )
}

export default ingredientTierForm
