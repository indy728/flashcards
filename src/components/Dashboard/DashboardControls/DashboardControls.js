import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../UI/Button/Button'

const Wrapper = styled.div`
    width: 25rem;
    border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    div:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.palette.grayscale[2]};
    }
`

const DashboardControlSection = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    Button {
        margin: .5rem 1.5rem;
    }
`

class dashboardControls extends Component {
    state = {
        ingredient: '',
        categories: false,
        category: ''
    }

    categorySelectHandler = (value) => {
        let ingredient = this.state.ingredient
        let categories = this.state.categories
        
        if (categories) {
            if (ingredient === value) {
                categories = false
                ingredient = ''
            } else {
                ingredient = value
            }
        } else {
            categories = true
            ingredient = value
        }

        this.setState({ingredient: ingredient, categories: categories})
    }

    buttonSelectedHandler = (section, value) => {
        return (this.state[section] === value)
    }
    
    render() {
        const ingredients = {...this.props.ingredients}
        const ingsKeys = Object.keys(ingredients)
        const ingredientControls = ingsKeys.map(ing => (
            <Button
                key={ing}
                value={ing}
                selected={this.buttonSelectedHandler('ingredient', ing)}
                clicked={() => this.categorySelectHandler(ing)}>
                {ing}
            </Button>
        ))
    
        let categoryControlsSection = null;
        if (this.state.categories) {
            const catKeys = Object.keys(ingredients[this.state.ingredient])
            const categoryControls = catKeys.map(cat => {
                const clickedObj = {
                    key: cat,
                    label: cat,
                    ingredient: this.state.ingredient,
                    type: 'ingredient'
                }

                return (
                    <Button
                        key={cat}
                        value={cat}
                        clicked={()=> this.props.addAttribute(clickedObj)}>
                        {cat}
                    </Button>
                )
            })
            categoryControlsSection = (
                <DashboardControlSection>
                    {categoryControls}
                </DashboardControlSection>
            )
        }
        
        return (
            <Wrapper>
                <DashboardControlSection>{ingredientControls}</DashboardControlSection>
                {categoryControlsSection}
            </Wrapper>
        )
    }

}

export default dashboardControls
