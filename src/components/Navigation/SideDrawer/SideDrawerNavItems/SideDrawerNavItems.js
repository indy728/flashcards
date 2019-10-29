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
    console.log(props.sideDrawer)

    let navItems = (
        <React.Fragment>
            <Wrapper >
                <NavigationItem link="/">Home</NavigationItem>
                <NavigationItem link="/appendix">Appendix</NavigationItem>
                <NavigationItem link="/quiz">Quiz</NavigationItem>
                <NavigationItem link="/logout">Log Out</NavigationItem>
            </Wrapper>
            <Wrapper>
                <NavigationItem link="/add_cocktail">Add New Drink</NavigationItem>
                <NavigationItem link="/">Add Ingredient</NavigationItem>
            </Wrapper>
        </React.Fragment>
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
