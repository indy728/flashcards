import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const Wrapper = styled.li`
    display: block;
    width: 100%;
    font-size: 2rem;
    color: ${props => props.theme.palette.white[0]};
    border-bottom: 4px solid transparent;
    text-align: center;

                
    :hover,
    :active {
        background-color: ${props => props.theme.palette.primary[3]};
        border-bottom: 4px solid ${props => props.theme.palette.secondary[2]};
    }
    
    a {
        color: ${props => props.theme.palette.primary[2]};
        text-decoration: none;
        width: 100%;
        display: block;
        transform: translateY(2px);
        /* border-bottom: 4px solid transparent; */
    }

    a.active {
        color: ${props => props.theme.palette.primary[0]};
        background-color: ${props => props.theme.palette.white[0]};
    }

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        min-width: 12rem;
        
        a {
            color: ${props => props.theme.palette.white[0]};
        }

    }
`

const navigationItem = (props) => {
    return (
        <Wrapper className={props.className}>
            <NavLink
                to={props.link}
                exact
                activeClassName="active"
            >
                {props.children}
            </NavLink>
        </Wrapper>
    )
}


navigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    active: PropTypes.bool
}

export default navigationItem
