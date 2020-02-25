import React from 'react'
import styled from 'styled-components'
import DashboardControls from './DashboardControls/DashboardControls'
import CocktailForm from './CocktailForm/CocktailForm'

const Wrapper = styled.div`
    width: 100%;
    flex: 1;

    @media (min-width: ${({ theme }) => theme.media.laptop}) {
        flex-flow: row;
    }
`

const DashboardForm = styled.div`
    flex: 1;
    height: 100%;
    justify-content: flex-start;

    @media (max-width: ${({ theme }) => theme.media.laptop}) {
        width: 100%;
    }
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
            <DashboardForm
                className='dashbvoard--form'
                >
                <CocktailForm
                    attributes={props.attributes}
                    open={props.controlsOpen}
                    inputChanged={props.inputChanged}
                    selectChanged={props.selectChanged}
                    removeAttribute={props.removeAttribute}
                    formIsValid={props.formIsValid}
                    toggleControls={props.toggleControls}
                    />
            </DashboardForm>
        </Wrapper>
    )
}

export default dashboard
