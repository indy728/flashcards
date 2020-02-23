import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    position: relative;
    display: ${props => props.hidden ? 'none' : 'inherit'};

    :not(:last-child) {
        border-bottom: 1px dotted ${({ theme }) => theme.palette.primary[2]}
    }
`

const sidebarSection = props => {
    return (
        <Wrapper
            className='side-drawer--section'
            { ...props }
            >
        
        </Wrapper>
    )
}

export default sidebarSection
