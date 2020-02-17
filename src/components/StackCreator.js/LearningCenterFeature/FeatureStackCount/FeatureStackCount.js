import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    /* font-size: 4.8rem; */
    * {font-family: ${({ theme }) => theme.fonts.script};}
`

const FeatureStackCount = props => {
  return (
    <Wrapper
        className='learning-center--feature__stack-count'
        >
          <h2>
            Choose a List:
          </h2>
        Current Stack: {props.count} Cocktail Cards
    </Wrapper>
  )
}

export default FeatureStackCount
