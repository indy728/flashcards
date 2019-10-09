import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Wrapper = styled.header`
    height: 6rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.palette.primary[1]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
    z-index: 90;
`

const NavWrapper = styled.nav`
    @media (max-width: 499px) {
        display: none
    }
`

const toolbar = (props) => {
    return (
        <Wrapper>
            <DrawerToggle 
                clicked={props.toggle} />
            <Logo />
            <NavWrapper>
                <NavigationItems />
            </NavWrapper>
        </Wrapper>
    )
}

toolbar.propTypes = {
    toggle: PropTypes.func
}

export default toolbar
