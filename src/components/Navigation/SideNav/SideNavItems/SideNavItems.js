import React from 'react'
import styled from 'styled-components'
import NavigationItem from '../../NavigationItems/NavigationItem/NavigationItem'

const Wrapper = styled.ul`
    list-style: none;
    width: 100%;
    padding: 1.5rem 0;
`

const NavItem = styled(NavigationItem)`
    width: 100%;
    color: ${props => props.theme.palette.primary[2]};
    border-bottom: none;
    padding: 1rem 0;
    
    a {
        color: ${props => props.theme.palette.primary[2]};
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
        padding: 1rem 0;
    }

    :hover,
    :active {
        background-color: inherit;
        border-bottom: none;
    }

    a.active {
        color: ${props => props.theme.palette.primary[0]};
        background-color: ${props => props.theme.palette.secondary[3]};
        cursor: default;
    }
`

const navigationItems = props => {
    const components = {...props.components}
    const componentKeys = Object.keys(components)
    const navItems = componentKeys.map(key => {
        return (
            <NavItem
                className="Sidedrawer__NavItem"
                key={components[key].key}
                link={components[key].link}>
                {components[key].title}
            </NavItem>
        )
    })

    return (
        <nav>
            <Wrapper>
                {navItems}
            </Wrapper>
        </nav>
    )
}

export default navigationItems
