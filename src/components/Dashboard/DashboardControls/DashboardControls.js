import React from 'react'
import styled from 'styled-components'
import ParentControl from './ParentControl/ParentControl'
import DashboardControl from './DashboardControl/DashboardControl'

const Wrapper = styled.div`
    width: 100%;

    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
        border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
    }
`

const CreateElementControl = styled(DashboardControl)`
    text-transform: uppercase;
    font-weight: normal;
    
    .addElementLabel {
        font-style: italic;
    }
`

const ignored = ["name", "rank"]

const dashboardControls = props => {
        const { ingredients } = props
        let buttons = []
        const groups = []
        
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
                                clicked={() => props.addAttribute(clickedObj)}
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
                clicked={()=> props.addAttribute({
                        subTier: 99,
                        label: 'Instructions',
                        type: 'instructions'
                    })}
                />
        )
        
        return (
            <Wrapper
                className='dashboard--controls'
                >
                {buttons}
            </Wrapper>
        )
}

export default dashboardControls
