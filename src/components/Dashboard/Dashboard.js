import React from 'react'
import styled from 'styled-components'
import DashboardControls from './DashboardControls/DashboardControls'
import CocktailForm from './CocktailForm/CocktailForm'

const Wrapper = styled.div`
    width: 100%;
`

const dashboard = props => {
    return (
        <Wrapper
            className='dashboard--content'
            >
            <DashboardControls
                open={props.controlsOpen}
                toggleControls={props.toggleControls}
                ingredients={props.ingredients}
                addIngredient={props.addIngredient}
                addAttribute={props.addAttribute}
                />
            <CocktailForm
                attributes={props.attributes}
                open={props.controlsOpen}
                inputChanged={props.inputChanged}
                selectChanged={props.selectChanged}
                removeAttribute={props.removeAttribute}
                formIsValid={props.formIsValid}
                toggleControls={props.toggleControls}
                />
        </Wrapper>
    )
}

export default dashboard
