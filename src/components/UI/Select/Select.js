import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.select`
`

const select = (props) => {
    return (
        <Wrapper
            name={props.name}
            className={props.className}
            onChange={props.changed}
            disabled={props.disabled || false}
            multiple={props.multiple || false}
            size={props.size}>
            {props.children}
        </Wrapper>
    )
}

export default select
