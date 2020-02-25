import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 499;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.palette.transparent[0]};
`

const backdrop = (props) => props.show ? <Wrapper className={props.className} onClick={props.clicked} /> : null

backdrop.propTypes = {
    clicked: PropTypes.func,
    show: PropTypes.bool
}

export default backdrop
