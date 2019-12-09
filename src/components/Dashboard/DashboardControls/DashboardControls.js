import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import Button from '../../UI/Button/Button'

import * as actions from '../../../store/actions'

const Wrapper = styled.div`
    width: 25rem;
    border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    /* > div:not(:last-child) {
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

const AddItemButton = styled.div`
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

// const itemInit = {
//     open: false,
//     list: []
// }

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

    divSort = obj => {

    }
    
    render() {
        const { ingredients, loading } = this.props
        let buttons = []

        if (!loading) {
            const groupKeys = Object.keys(ingredients)
            const groups = []


            // buttons = groupKeys.map(group => {
            for (let group in ingredients) {
                const categories = ingredients[group]
                const categoryDivs = []
                let groupRank = ingredients[group].rank


                for (let category in categories) {
                    let rank = 99
                    if (category === 'rank') {
                        rank = categories[category]
                        console.log(rank)
                        continue
                    }
                    const items = ingredients[group][category]
                    const itemButtons = []
                    
                    for (let item in items) {
    
                        if (items[item].name) {
                            const clickedObj = {
                                subTier: categories.rank,
                                label: items[item].name,
                                type: 'ingredient'
                            }
                            
                            itemButtons.push(
                                <AddItemButton
                                    className='addItemButton'
                                    key={item}
                                    value={item}
                                    onClick={()=> this.props.addAttribute(clickedObj)}
                                    >
                                    {items[item].name}
                                </AddItemButton>
                        )}
                    }
                    categoryDivs.push(<DashboardControlSection key={category} rank>{itemButtons}</DashboardControlSection>)
                }
                groups.push({categories: categoryDivs, rank: groupRank})
            }

            groups.sort((a, b) => a.rank > b.rank ? 1 : -1)
            for (let group in groups) {
                buttons.push(groups[group].categories)
            }

            const instructions = (
                <AddItemButton
                    value={'instructions'}
                    onClick={()=> this.props.addAttribute({
                        subTier: 99,
                        label: 'Instructions',
                        type: 'instructions'})}
                    >
                    Instructions
                </AddItemButton>
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
