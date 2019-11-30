import React from 'react'
import styled from 'styled-components'
import NavigationItem from './NavigationItem/NavigationItem'

const Wrapper = styled.ul`
    list-style: none;
    display:  ${props => props.sideDrawer ? "none" : "flex"};
    align-self: stretch;
    align-items: center;

    > * {
        height: 100%;
    }
`

const navigationItems = props => {
    const components = {...props.components}
    const componentKeys = Object.keys(components)
        .filter(key => components[key].usage === "basic" && props.isAuthenticated === components[key].isAuth)
    
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
        <Wrapper>
            {navItems}
        </Wrapper>
    )
}

export default navigationItems
