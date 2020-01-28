import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100%;
    width: 10rem;
    max-width: 10%;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
`

const slideshowControlButton = props => {

    return (
        <Wrapper
            className={props.className}
            onClick={props.clicked}
            >
            {props.buttonSymbol}
        </Wrapper>
            
    )

}

export default slideshowControlButton