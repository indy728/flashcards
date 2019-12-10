import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ParentControl from './ParentControl/ParentControl'
import DashboardControl from './DashboardControl/DashboardControl'

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

// const DashboardControlSection = styled.div`
//     width: 100%;
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: center;
// `

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
        let buttons = []

        if (!loading) {
            const groups = []

            for (let group in ingredients) {
                const categories = ingredients[group]
                let categoryDivs = []
                let groupRank = ingredients[group].rank


                for (let category in categories) {
                    if (category === 'rank') continue
                    const items = ingredients[group][category]
                    const itemButtons = []

                    for (let item in items) {
                        if (item === 'rank') continue
                        if (items[item].name) {
                            const clickedObj = {
                                label: items[item].name,
                                subTier: categories.rank,
                                type: 'ingredient'
                            }
                            
                            itemButtons.push(
                                <DashboardControl
                                    className='dashboardControl'
                                    key={item}
                                    level={2}
                                    label=
                                    {items[item].name}
                                    clicked={()=> this.props.addAttribute(clickedObj)}
                                    />
                        )}
                    }
                    categoryDivs.push(
                        <ParentControl
                            key={category}
                            label={category}
                            level={1}
                            >
                            {itemButtons}
                        </ParentControl>
                    )
                }
                categoryDivs = <ParentControl key={group} label={group}>{categoryDivs}</ParentControl>
                groups.push({categories: categoryDivs, rank: groupRank})
            }

            groups.sort((a, b) => a.rank > b.rank ? 1 : -1)
            for (let group in groups) {
                buttons.push(groups[group].categories)
            }

            buttons.push(
                <DashboardControl
                    label='Instructions'
                    value='instructions'
                    clicked={()=> this.props.addAttribute({
                            subTier: 99,
                            label: 'Instructions',
                            type: 'instructions'
                        })
                    }
                    />
            )
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
