import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
    padding: 1rem;
    background-color: ${props => props.theme.palette.white[2]};
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 1px;
    border: 1px solid ${props => props.theme.palette.grayscale[2]};
    box-shadow: 2px 2px ${props => props.theme.palette.grayscale[0]};
    text-transform: uppercase;
`

const button = (props) => (
    <Button
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
