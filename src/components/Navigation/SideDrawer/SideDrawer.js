import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import SideDrawerNavItems from '../SideDrawer/SideDrawerNavItems/SideDrawerNavItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const Wrapper = styled.div`
    position: fixed;
    width: 40rem;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: ${props => props.theme.palette.white[2]};
    padding: 2rem 2rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;

    transform: ${props => props.open ? "translateX(0)" : "translateX(-100%)"};

    @media (max-width: 500px) {
        width: 28rem;
        max-width: 100%;
    }
`

const SidebarSection = styled.div`
    /* height: 20%; */
    width: 100%;
    /* margin-bottom: 3rem; */
    position: relative;

    :not(:first-child) {
        padding-top: 1.5rem;
        
        :hover {
            background-color: ${props => props.theme.palette.white[1]};
        }
    }

    :not(:last-child) {
        padding-bottom: 1.5rem;
        border-bottom: 2px solid ${props => props.theme.palette.primary[2]}
    }
`

const SidebarLogo = styled.div`
    width: 100%;
    height: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const sideDrawer = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.close} />
            <Wrapper open={props.open} onClick={props.close}>
                <SidebarSection>
                    <SidebarLogo>
                        <Logo />
                    </SidebarLogo>
                </SidebarSection>
                <SidebarSection>
                    <nav>
                        <SideDrawerNavItems
                            isAuthenticated={props.isAuthenticated}
                            sideDrawer={props.open} />
                    </nav>
                </SidebarSection>
                <SidebarSection>

                </SidebarSection>
            </Wrapper>
        </React.Fragment>
    )
}

sideDrawer.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default sideDrawer
