import React from 'react'
import styled from 'styled-components'

import ParentControl from './ParentControl/ParentControl'
import DashboardControl from './DashboardControl/DashboardControl'


const Wrapper = styled.div`
    width: 25rem;
    border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const AddElementControl = styled(DashboardControl)`
    text-transform: uppercase;
    font-weight: normal;
    
    .addElementLabel {
        font-style: italic;
    }
`

const dashboardControls = props => {
        const { ingredients } = props
        let buttons = []
        const groups = []
        
        for (let group in ingredients) {
            const categories = ingredients[group]
            const categoryDivs = []
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
                            key: item,
                            subTier: categories.rank,
                            type: 'ingredient'
                        }
                        itemButtons.push(
                            <DashboardControl
                                className='dashboardControl'
                                key={item}
                                level={2}
                                label={items[item].name}
                                clicked={()=> props.addAttribute(clickedObj)}
                                />
                    )}
                }
                itemButtons.push(
                    <AddElementControl
                                className='addElementControl'
                                labelClassName='addElementLabel'
                                key={"add" + category}
                                level={2}
                                label={"add to " + category}
                                clicked={props.addIngredient}
                                />
                )
                categoryDivs.push(
                    <ParentControl
                        key={category}
                        label={category}
                        level={1}
                        addIngredient={props.addIngredient}
                        >
                        {itemButtons}
                    </ParentControl>
                )
            }
            categoryDivs.push(
                <AddElementControl
                    className='addElementControl'
                    labelClassName='addElementLabel'
                    key={"add" + group}
                    level={1}
                    label={"add to " + group}
                    clicked={props.addIngredient}
                    />
            )
            const newCategory = (
                <ParentControl
                    key={group} 
                    label={group}
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
                clicked={()=> props.addAttribute({
                        subTier: 99,
                        label: 'Instructions',
                        type: 'instructions'
                    })}
                />
        )
        
        return (
            <Wrapper>
                {buttons}
            </Wrapper>
        )
}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.ingredients.ingredients,
//         loading: state.ingredients.loading
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitIngredients: () => dispatch(actions.fetchIngredients())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DashboardControls)
export default dashboardControls
