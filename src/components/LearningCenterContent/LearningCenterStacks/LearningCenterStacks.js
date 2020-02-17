import React from 'react'
import styled from 'styled-components'
import ChooseStack from './ChooseStack/ChooseStack'

const Wrapper = styled.div`
    width: 100%;
    min-height: 20rem;
    padding: 1rem 0;
    justify-content: center;
`

const learningCenterStacks = props => {
  return (
    <Wrapper
        className='learning-center--stacks'
        >
        <ChooseStack />
    </Wrapper>
  )
}

export default learningCenterStacks
