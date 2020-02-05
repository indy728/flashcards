import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import styled from 'styled-components'
import { Button } from '../../UI'
import StackManagementItem from './StackManagementItem/StackManagementItem'

const Wrapper = styled.div`
    width: 100%;
    margin-top: 5rem;
    padding: 0 5rem;
    display: flex;
    flex-flow: column;
    align-items: center;
`

const StackManagementButton = styled(Button)`
    color: ${props => props.theme.palette.white[0]};
    background-color: ${props => props.theme.palette.grayscale[1]};
    border: 4px outset ${props => props.theme.palette.grayscale[5]};

    &.stack-management-item--search-button {
        width: 100%;
    }


`



class StackManager extends Component {
    state = {

    }

    launchCocktailSearch = searchType => {
        console.log('[StackManager] searchType: ', searchType)
        return
    }

    addAllCocktails = () => {
        console.log('[StackManager] this.props.cocktails: ', this.props.cocktails)
        console.log('[StackManager] this.props.stack: ', this.props.stack)
    }

    render() {
        const stackManagementAddItems = [
            {
                text: 'Add Cocktail By Name',
                launchCocktailSearch: true,
                searchType: 'name'
            },
            {
                text: 'Add Cocktail By Ingredient',
                launchCocktailSearch: true,
                searchType: 'element'
            },
            {
                text: 'Add All Cocktails',
                launchCocktailSearch: false,
                searchType: 'all'
            },
        ]
        let addButtons = stackManagementAddItems.map(addItem => {
            const addFunc = addItem.launchCocktailSearch 
                ? () => this.launchCocktailSearch(addItem.searchType)
                : this.addAllCocktails
            return (
                <StackManagementItem
                    className={`stack-management-item--${addItem.searchType}`}
                    key={addItem.searchType}
                    >
                    <StackManagementButton
                        className='stack-management-item--search-button'
                        clicked = {addFunc}
                        >
                        {addItem.text}
                    </StackManagementButton>
                </StackManagementItem>
            )
        })

        return(
            <Wrapper
                className='learning-center--stack-manager'
                >
                {addButtons}
                <StackManagementItem>
                    Add <input></input> Random Flashcards
                    <Button>
                        Add
                    </Button>
                </StackManagementItem>
                <Button>
                    View Stack
                </Button>
                <Button>
                    Clear Stack
                </Button>
            </Wrapper>
        )
    } 
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        stack: state.learning.stack
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToStack: pool => dispatch(actions.addToStack(pool)),
        onRemoveFromStack: pool => dispatch(actions.removeFromStack(pool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StackManager)
