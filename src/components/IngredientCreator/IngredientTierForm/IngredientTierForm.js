import React from 'react'
import styled from 'styled-components'
import IngredientTierSelect from './IngredientTierSelect/IngredientTierSelect'
import IngredientTierHeader from './IngredientTierHeader/IngredientTierHeader'
import Select from '../../UI/Select/Select'

const Wrapper = styled.div`
    width: 80%;
    height: 10rem;
    margin: .5rem 0;
    padding: 1.5rem 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const IngredientSelect = styled(Select)`
    min-width: 30rem;
    height: 5rem;
    border-radius: 0;
    border: 2px solid black;
    font-size: 1.6rem;
    font-weight: bold;
    text-align-last: center;
    text-transform: uppercase;
`

const ingredientTierForm = (props) => {
    let options = null

    if (props.options) {
        options = props.options.map(key => <option key={key} value={key}>{key}</option>)
    }

    return (
        <Wrapper className={props.className}>
            <IngredientTierHeader>{props.name}</IngredientTierHeader>
            <IngredientSelect
                name={props.name}
                changed={props.changed}
                className="ingredient-select">
                        <option hidden>-- select an option--</option>
                        {options}
                        <option value="add">Add A New Item to {props.name}</option>
                        <option value="edit">Edit ingredient list</option>
            </IngredientSelect>
        </Wrapper>
    )
}

export default ingredientTierForm
