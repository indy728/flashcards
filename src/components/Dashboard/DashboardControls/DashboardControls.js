import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import Button from '../../UI/Button/Button'
import Sprite from '../../UI/Sprite/Sprite'

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

const AddItemParent = styled(AddItemButton)`
    height: 2.8rem;
    font-size: 1.6rem;
    font-weight: bold;
`

class ControlsParent extends Component {
    state = {
        hideChildren: true
    }

    toggleShowHide() {
        this.setState(prevState => {
            return {hideChildren: !prevState.hideChildren}
        })
    }

    render() {
        const { hideChildren } = this.state

        return (
            <React.Fragment>
                <AddItemParent 
                    className='addItemParent'
                    onClick={() => this.toggleShowHide()}
                    >
                    <span>{this.props.label}</span>
                    <Sprite 
                        className='addItemParent--chevron'
                        height='1.8rem'
                        spriteName={hideChildren ? 'chevron-right' : 'chevron-down'}
                        />
                </AddItemParent>
                {!hideChildren && this.props.children}
            </React.Fragment>
        )
    }
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
        let buttons = []

        if (!loading) {
            const groups = []

            for (let group in ingredients) {
                const categories = ingredients[group]
                let categoryDivs = []
                let groupRank = ingredients[group].rank
                console.log(group)


                for (let category in categories) {
                    if (category === 'rank') continue
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
                    categoryDivs.push(
                        <DashboardControlSection key={category}>
                            <ControlsParent
                                label={category}
                                >
                                {itemButtons}
                            </ControlsParent>
                        </DashboardControlSection>)
                }
                categoryDivs = <ControlsParent label={group}>{categoryDivs}</ControlsParent>
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
