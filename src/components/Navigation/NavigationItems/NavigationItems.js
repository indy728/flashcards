import React from 'react'
import styled from 'styled-components'
import NavigationItem from './NavigationItem/NavigationItem'

const Wrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
    }
`

const navigationItems = (props) => {
    return (
        <Wrapper>
            <NavigationItem link="/">Appendix</NavigationItem>
            <NavigationItem link="/">Quiz</NavigationItem>
            <NavigationItem link="/add_cocktail">Add New Drink</NavigationItem>
            <NavigationItem link="/auth">Log In</NavigationItem>
        </Wrapper>
    )
}

export default navigationItems
