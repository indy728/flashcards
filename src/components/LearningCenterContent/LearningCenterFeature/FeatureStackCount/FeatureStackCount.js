import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    font-size: 4.8rem;
    font-family: ${props => props.theme.fonts.script};
`

const FeatureStackCount = props => {
  return (
    <Wrapper
        className='learning-center--feature__stack-count'
        >
        Current Stack: {props.count} Cocktail Cards
    </Wrapper>
  )
}

export default FeatureStackCount
