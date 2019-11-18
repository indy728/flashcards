import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
    padding: 1rem;
    background-color: ${props => props.selected ? props.theme.palette.primary[2] : props.theme.palette.white[2]};
    color: ${props => props.selected ? props.theme.palette.white[0] : 'black'};
    /* box-shadow: ${props => props.selected ? '2px 2px ' + props.theme.palette.primary[0] : 'none'}; */
    /* outline: ${props => props.selected ? '2px solid ' + props.theme.palette.primary[2] : 'none'}; */
    /* outline-offset: 3px; */
    text-transform: uppercase;
    cursor: pointer;


`

const button = (props) => (
    <Button
        {...props}
        onClick={props.clicked}
        >
            {props.children}
    </Button>
)

button.propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default button
