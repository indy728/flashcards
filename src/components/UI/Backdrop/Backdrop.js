import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(13 ,17 ,19 , 0.5);
`

const backdrop = (props) => props.show ? <Wrapper onClick={props.clicked} /> : null

backdrop.propTypes = {
    clicked: PropTypes.func,
    show: PropTypes.bool
}

export default backdrop
