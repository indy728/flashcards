import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 25rem;
    border-right: 1px solid ${props => props.theme.palette.grayscale[2]};
`

const dashboardControls = props => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default dashboardControls
