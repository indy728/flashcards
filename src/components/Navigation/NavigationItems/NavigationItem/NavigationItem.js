import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const Wrapper = styled.li`
    margin: 1rem 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    font-size: 2rem;
    color: ${props => props.theme.palette.white[0]};
    
    a {
        color: ${props => props.theme.palette.primary[2]};
        text-decoration: none;
        width: 100%;
        box-sizing: border-box;
        display: block;
        border-bottom: 4px solid transparent;
    }
            
    a:hover,
    a:active {
        background-color: ${props => props.theme.palette.primary[3]};
        border-bottom: 4px solid ${props => props.theme.palette.secondary[2]};
    }

    a.active {
        color: ${props => props.theme.palette.primary[0]};
        background-color: ${props => props.theme.palette.white[0]};
    }

    @media (min-width: 500px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        padding: 2rem 1rem;
        min-width: 12rem;
        text-align: center;
        
        a {
            color: ${props => props.theme.palette.white[0]};
            height: 100%;
            padding: 1.5rem 1rem;
        }

    }
`

const navigationItem = (props) => {
    return (
        <Wrapper>
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
