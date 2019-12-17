import React from 'react'
import styled from 'styled-components'
import IngredientForm from '../../components/IngredientForm/IngredientForm'

const Wrapper = styled.div`

`

const ingredientCreator = props => {
  return (
    <Wrapper>
        <IngredientForm />
    </Wrapper>
  )
}

export default ingredientCreator
