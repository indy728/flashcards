import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import NavigationItems from '../NavigationItems/NavigationItems'
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
    display: ${props => props.show ? "inherit" : "none"};

    @media (max-width: 499px) {
        display: none
    }
`

const toolbar = (props) => {
    return (
        <Wrapper>
            <DrawerToggle 
                clicked={props.toggle} />
            <NavWrapper show={!props.sideDrawer}>
                <NavigationItems
                    isAuthenticated={props.isAuthenticated}
                    components={props.components}
                    sideDrawer={props.sideDrawer} />
            </NavWrapper>
        </Wrapper>
    )
}

toolbar.propTypes = {
    toggle: PropTypes.func
}

export default toolbar
