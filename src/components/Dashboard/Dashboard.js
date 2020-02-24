import React from 'react'
import styled from 'styled-components'
import DashboardControls from './DashboardControls/DashboardControls'
import CocktailForm from './CocktailForm/CocktailForm'

const Wrapper = styled.div`
`

const dashboard = props => {
    return (
        <Wrapper
            className='dashboard--content'
            >
            <DashboardControls 
                ingredients={props.ingredients}
                addIngredient={props.addIngredient}
                addAttribute={props.addAttribute} />
            <CocktailForm 
                {...props}/>
        </Wrapper>
    )
}

export default dashboard
