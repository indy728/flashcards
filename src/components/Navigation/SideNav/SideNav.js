import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import SidebarSection from './SidebarSection/SidebarSection'
import SideNavItems from './SideNavItems/SideNavItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    
    background-color: ${({ theme }) => theme.palette.white[2]};
    
    
    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 500;
        padding: 0 2rem;
        transform: ${props => props.open ? "translateX(0)" : "translateX(-100%)"};
        transition: transform 0.3s ease-out;
    }

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        width: 47.5rem;
    }

    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
        flex: 0 0 18%;
        justify-content: stretch;
        /* transform: translateX(0); */
    }
`

const SidebarLogo = styled.div`
    width: 100%;
    height: 15rem;
    justify-content: center;
`

// Creates sub-objects based on category
const objReducer = (obj, keys, filter) => {
    const reducedObj = keys.filter(key => obj[key].usage === filter)
        .reduce((newObj, key) => {
            newObj[key] = obj[key]
            return newObj
        }, {})
        return reducedObj
}

const sideNav = (props) => {
    const components = {...props.components}
    // Matches available components based on authentication
    const componentKeys = Object.keys(components)
        .filter(key => props.isAuthenticated === components[key].isAuth)
    const basics = objReducer(components, componentKeys, "basic")
    const creators = objReducer(components, componentKeys, "creator")

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.close} />
            <Wrapper
                className='app-content--side-nav'
                open={props.open}
                onClick={props.close}
                >
                <SidebarSection hidden={!props.open}>
                    <SidebarLogo>
                        <Logo />
                    </SidebarLogo>
                </SidebarSection>
                <SidebarSection>
                    <SideNavItems
                        isAuthenticated={props.isAuthenticated}
                        components={basics}
                        sideNav={props.open} />
                </SidebarSection>
                <SidebarSection>
                    <SideNavItems
                        isAuthenticated={props.isAuthenticated}
                        components={creators}
                        sideNav={props.open} />
                </SidebarSection>
            </Wrapper>
        </React.Fragment>
    )
}

sideNav.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default sideNav
