import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
    padding: 1rem;
    background-color: ${props => props.theme.palette.white[2]};
    text-transform: uppercase;
    cursor: pointer;
`

const button = (props) => (
    <Button
            className={props.className}
            disabled={props.disabled}
            // className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
    </Button>
)

button.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default button
