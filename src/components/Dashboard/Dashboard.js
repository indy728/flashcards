import React from 'react'
import styled from 'styled-components'
import DashboardControls from './DashboardControls/DashboardControls'
import CocktailForm from './CocktailForm/CocktailForm'

const Wrapper = styled.div`
    width: 100%;
    height: 10rem;
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;
`

const dashboard = props => {
    return (
        <Wrapper>
            <DashboardControls />
            <CocktailForm />
        </Wrapper>
    )
}

export default dashboard
