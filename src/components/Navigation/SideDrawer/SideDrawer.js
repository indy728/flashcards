import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Wrapper = styled.div`
    position: fixed;
    width: 28rem;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: ${props => props.theme.palette.white[2]};
    padding: 3rem 3rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;

    transform: ${props => props.open ? "translateX(0)" : "translateX(-100%)"};

    @media (min-width: 500px) {
        display: none;
    }
`

const SidebarLogo = styled.div`
    height: 20%;
    margin-bottom: 3rem;

    img {
        height: 100%;
        transform: translateY(-3rem)
    }
`

const sideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.close} />
            <Wrapper open={props.open} onClick={props.close}>
                <SidebarLogo>
                    <Logo />
                </SidebarLogo>
                <nav>
                    <NavigationItems />
                </nav>
            </Wrapper>
        </React.Fragment>
    )
}

sideDrawer.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default sideDrawer
