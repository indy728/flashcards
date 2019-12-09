import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '../../UI/Button/Button'
import Sprite from '../../UI/Sprite/Sprite'

import * as actions from '../../../store/actions'
import { updateObject } from '../../../shared/utility'

const Wrapper = styled.div`
    width: 25rem;
    border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
/* 
    div:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.palette.grayscale[2]};
    } */
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

const ControlWrapper = styled.div`
    width: 100%;
    height: 2.4rem;
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    background-color: ${props => props.theme.palette.white[2]};
    
    :hover {
        background-color: ${props => props.theme.palette.white[1]};
    }
`

const itemInit = {
    open: false,
    list: []
}

class DashboardControls extends Component {
    state = {
        ingredient: '',
        categories: false,
        groups: []
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
        const { ingredients, loading } = this.props
        let buttons = null

        if (!loading) {
            const groupKeys = Object.keys(ingredients)

            buttons = groupKeys.map(group => {
                const categories = ingredients[group]
                const categoryDivs = []

                for (let category in categories) {
                    const items = ingredients[group][category]
                    const itemButtons = []
                    
                    for (let item in items) {
    
                        if (items[item].name) {
                            const clickedObj = {
                                key: item,
                                label: items[item].name,
                                type: 'ingredient'
                            }

                            itemButtons.push(
                                <Button
                                    key={item}
                                    value={item}
                                    clicked={()=> this.props.addAttribute(clickedObj)}>
                                    {items[item].name}
                                </Button>
                        )}
                    }
                    categoryDivs.push(<DashboardControlSection key={category}>{itemButtons}</DashboardControlSection>)
                }
                return categoryDivs
            })

            const instructions = (
                <Button
                    value={'instructions'}
                    clicked={()=> this.props.addAttribute({
                        key: 'instructions' + new Date(),
                        label: 'Instructions',
                        type: 'instructions'})}>
                    Instructions
                </Button>
            )

            buttons.push(<DashboardControlSection key={'instructions'}>{instructions}</DashboardControlSection>)
        }
        
        return (
            <Wrapper>
                {buttons}
            </Wrapper>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        loading: state.ingredients.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardControls)
