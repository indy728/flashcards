import React from 'react'
import styled from 'styled-components'
import NavigationItem from './NavigationItem/NavigationItem'

const Wrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display:  ${props => props.sideDrawer ? "none" : "flex"};
    flex-flow: row;
    align-items: center;
    height: 100%;
`

const navigationItems = props => {
    console.log(props.sideDrawer)

    let navItems = (
        <Wrapper sideDrawer={props.sideDrawer} >
            <NavigationItem link="/appendix">Appendix</NavigationItem>
            <NavigationItem link="/quiz">Quiz</NavigationItem>
            <NavigationItem link="/logout">Log Out</NavigationItem>
        </Wrapper>
    )
    if (!props.isAuthenticated) {
        navItems = (
            <Wrapper>
                <NavigationItem link="/auth">Log In</NavigationItem>
            </Wrapper>
        )
    }

    return (
        <React.Fragment>
            {navItems}
        </React.Fragment>
    )
}

export default navigationItems
