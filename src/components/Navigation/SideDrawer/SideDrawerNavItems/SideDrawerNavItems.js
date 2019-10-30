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
    /* height: 100%; */
    width: 100%;

    /* @media (min-width: 500px) {
        flex-flow: row;
    } */
`

const NavItem = styled(NavigationItem)`
    margin: 0;
    width: 100%;
    color: ${props => props.theme.palette.primary[2]};
    padding: 1rem .5rem;
    
    a {
        color: ${props => props.theme.palette.primary[2]};
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
        border-bottom: 4px solid transparent;
        padding: 1rem .5rem;
        text-align: center;
    }

    a:hover {
        color: ${props => props.theme.palette.white[2]};
    }
            
    a:hover,
    a:active {
    }

    a.active {
        color: ${props => props.theme.palette.primary[0]};
        background-color: ${props => props.theme.palette.secondary[3]};
        border-bottom: none;
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
