import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DrawerToggle from '../SideNav/DrawerToggle/DrawerToggle'

const Wrapper = styled.header`
    height: 7rem;
    width: 100%;
    background-color: ${props => props.theme.palette.primary[3]};
    border-bottom: ${props => props.theme.palette.grayscale[1]};
    align-items: flex-start;

    @media (max-width: ${({ theme }) => theme.media.tablet}) {
        position: fixed;
        top: 0;
        left: 0;
    }
`

const navHeader = (props) => {
    return (
        <Wrapper
            className='nav-header'>
            <DrawerToggle 
                clicked={props.toggle} />
        </Wrapper>
    )
}

navHeader.propTypes = {
    toggle: PropTypes.func
}

export default navHeader
