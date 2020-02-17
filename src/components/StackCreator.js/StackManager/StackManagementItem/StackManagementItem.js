import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    
    :not(:first-child){
        padding-top: 2rem;
    }

    :last-child {
        padding-bottom: 2rem;
    }
`

const stackManagementItem = props => {
  return (
    <Wrapper
        className={props.className}
        >
        {props.children}
    </Wrapper>
  )
}

export default stackManagementItem
