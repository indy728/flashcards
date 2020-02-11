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

    &.stack-management-item--view-button,
    &.stack-management-item--clear-button,
    &.stack-management-item--add-random-button {
        width: 25rem;
    }
/* 
    &.stack-management-item--clear-button {

    } */


`

const StackManagementAddQty = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
        font-family: ${props => props.theme.fonts.script};
        font-size: 2.4rem;

        padding: 0 2rem;
    }
`

const StackManagementAddQtyInput = styled.input`
    width: 6rem;
    text-align: center;
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
        const { cocktails, stack } = this.props
        const addPool = []

        for (let cocktail in cocktails) {
            if (stack.pool.indexOf(cocktail) === -1) addPool.push(cocktail)
        }
        this.props.onAddToStack(addPool)
    }

    render() {
        console.log('[StackManager] this.stack.pool: ', this.props.stack.pool)
        console.log('[StackManager] this.stack.count: ', this.props.stack.count)
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
                <StackManagementItem
                    className='stack-management-item'
                    >
                    <StackManagementAddQty>
                        <div>
                            Add 
                        </div>
                        <StackManagementAddQtyInput
                            className='stack-management-item--add-random-qty__input'
                            placeholder='(1 - 100)'
                            />
                        <div>
                            Random Cocktails
                        </div>
                    </StackManagementAddQty>
                    <StackManagementButton
                        className='stack-management-item--add-random-button'
                        >
                        Add
                    </StackManagementButton>
                </StackManagementItem>
                <StackManagementItem>
                    <StackManagementButton
                        className='stack-management-item--view-button'
                        >
                        View Stack
                    </StackManagementButton>
                    <StackManagementButton
                        className='stack-management-item--clear-button'
                        clicked={() => this.props.onRemoveFromStack(this.props.stack.pool)}
                        >
                        Clear Stack
                    </StackManagementButton>
                </StackManagementItem>
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
