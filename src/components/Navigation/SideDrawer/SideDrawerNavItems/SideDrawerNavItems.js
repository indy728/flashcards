import React from 'react'
import styled from 'styled-components'
import NavigationItem from '../../NavigationItems/NavigationItem/NavigationItem'

const Wrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    /* @media (min-width: 500px) {
        flex-flow: row;
    } */
`

const navigationItems = props => {
    const components = {...props.components}
    const componentKeys = Object.keys(components)
    const navItems = componentKeys.map(key => {
        return (
            <NavigationItem
                key={components[key].key}
                link={components[key].link}>
                {components[key].title}
            </NavigationItem>
        )
    })

    return (
        <nav>
            {navItems}
        </nav>
    )
}

export default navigationItems
