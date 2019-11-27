import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

`

const dropDownHeader = props => {
    return (
        <Wrapper onClick={props.clicked}>

        </Wrapper>
    )
}

export default dropDownHeader
