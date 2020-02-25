import React from 'react'
import styled from 'styled-components'
import ParentControl from './ParentControl/ParentControl'
import DashboardControl from './DashboardControl/DashboardControl'
import { Backdrop } from '../../UI'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    @media (max-width: ${({ theme }) => theme.media.laptop}) {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 398;
        transform: ${props => props.open ? "translateY(0)" : "translateY(-100%)"};
        transition: transform 0.3s ease-out;
    }

    @media (min-width: ${({ theme }) => theme.media.laptop}) {
        border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
        max-width: 25rem;
    }
`

const CreateElementControl = styled(DashboardControl)`
    text-transform: uppercase;
    font-weight: normal;
    
    .addElementLabel {
        font-style: italic;
    }
`

const DashboardControlButtons = styled.div`
    background-color: ${props => props.theme.palette.white[2]};
    max-height: 100%;
    
    @media (max-width: ${({ theme }) => theme.media.laptop}) {
        width: calc(100% - 4rem);
        margin: 2rem;
        padding: 1rem;
        z-index: 400;
        overflow: scroll;
    }

    @media (min-width: ${({ theme }) => theme.media.laptop}) {
        width: 100%;
        flex: 1;
    }
`

const ControlsCloseButton = styled.div`
    background-color: ${({ theme }) => theme.palette.white[0]};
    height: 3rem;
    width: 3rem;
    position: fixed;
    top: .75rem;
    left: .75rem;
    border-radius: 50%;
    z-index: 2000;
    box-shadow: ${({ theme }) => theme.shadow.component};
    text-align: center;
    cursor: pointer;
    justify-content: center;

    @media (min-width: ${({ theme }) => theme.media.laptop}) {
        display: none;
    }
`

const ClosedX = styled.div`
    width: 1.5rem;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.grayscale[0]};
`

const ControlsBackdrop = styled(Backdrop)`
    z-index: 399;

    @media (min-width: ${({ theme }) => theme.media.laptop}) {
        display: none;
    }
`

const ignored = ["name", "rank"]

const dashboardControls = props => {
    console.log('[DashboardControls] props: ', props)
    const { ingredients } = props
    let buttons = []
    const groups = []

    const clickedControl = (e, attribute) => {
        if (props.open){
            props.toggleControls(e)
        }
        props.addAttribute(attribute)
    }
    
    for (let group in ingredients) {
        if (ignored.indexOf(group) !== -1) continue
        const categories = ingredients[group]
        const categoryDivs = []
        const groupLabel = ingredients[group].name
        let groupRank = ingredients[group].rank

        for (let category in categories) {
            if (ignored.indexOf(category) !== -1) continue
            const items = ingredients[group][category]
            const itemButtons = []
            const catLabel = categories[category].name

            for (let item in items) {
                if (ignored.indexOf(item) !== -1) continue
                if (items[item].name) {
                    const clickedObj = {
                        label: items[item].name,
                        attributes: items[item].attributes,
                        key: item,
                        subTier: categories.rank,
                        type: 'ingredient'
                    }
                    itemButtons.push(
                        <DashboardControl
                            className='dashboard--controls__add-element'
                            key={item}
                            level={2}
                            label={items[item].name}
                            clicked={e => {clickedControl(e, clickedObj)}}
                            />
                )}
            }
            itemButtons.push(
                <CreateElementControl
                            className='dashboard--controls__create-element'
                            labelClassName='addElementLabel'
                            selectors={[group, category]}
                            key={"add" + category}
                            level={2}
                            label={"add to " + catLabel}
                            clicked={() => props.addIngredient([group, category])}
                            />
            )
            categoryDivs.push(
                <ParentControl
                    key={category}
                    label={catLabel}
                    level={1}
                    className={'dashboard--controls__parent-level-' + 1}
                    addIngredient={props.addIngredient}
                    >
                    {itemButtons}
                </ParentControl>
            )
        }
        categoryDivs.push(
            <CreateElementControl
                className='dashboard--controls__create-element'
                labelClassName='addElementLabel'
                selectors={[group]}
                key={"add" + group}
                level={1}
                label={"add to " + groupLabel}
                clicked={() => props.addIngredient([group])}
                />
        )
        const newCategory = (
            <ParentControl
                key={group} 
                className={'dashboard--controls__parent-level-' + 0}
                label={groupLabel}
                addIngredient={props.addIngredient}
                >
                {categoryDivs}
            </ParentControl>
        )
        groups.push({categories: newCategory, rank: groupRank})
    }
    groups.sort((a, b) => a.rank > b.rank ? 1 : -1)
    for (let group in groups) {
        buttons.push(groups[group].categories)
    }
    buttons.push(
        <DashboardControl
            label='Instructions'
            key='instructions'
            className='dashboard--controls__add-instructions'
            clicked={e => clickedControl(e, {
                    subTier: 99,
                    label: 'Instructions',
                    type: 'instructions'
                })}
            />
    )
    
    return (
        <Wrapper
            className='dashboard--controls'
            open={props.open}
            >
            <ControlsBackdrop 
                className='dashboard--controls__backdrop'
                show={props.open}
                clicked={props.toggleControls}
                />
            <ControlsCloseButton 
                onClick={props.toggleControls}
                className='dashboard--controls__close-button'
                >
                <ClosedX />
            </ControlsCloseButton>
            <DashboardControlButtons
                className='dashboard--control-buttons'
                >
                {buttons}
            </DashboardControlButtons>
        </Wrapper>
    )
}

export default dashboardControls
