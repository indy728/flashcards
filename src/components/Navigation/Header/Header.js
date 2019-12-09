import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DrawerToggle from '../SideNav/DrawerToggle/DrawerToggle'

const Wrapper = styled.header`
    height: 7rem;
    /* width: 100%;
    position: fixed;
    top: 0;
    left: 0; */
    background-color: ${props => props.theme.palette.primary[3]};
    border-bottom: ${props => props.theme.palette.grayscale[1]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 2rem;
    z-index: 90; */
`

const header = (props) => {
    return (
        <Wrapper>
            <DrawerToggle 
                clicked={props.toggle} />
            {/* <NavWrapper show={!props.sideDrawer}> */}
                {/* <NavigationItems
                    isAuthenticated={props.isAuthenticated}
                    components={props.components}
                    sideDrawer={props.sideDrawer} /> */}
            {/* </NavWrapper> */}
        </Wrapper>
    )
}

header.propTypes = {
    toggle: PropTypes.func
}

export default header
