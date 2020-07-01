import React from 'react'
import styled from 'styled-components'
import FeatureStackCount from './FeatureStackCount/FeatureStackCount'
import FeatureLaunchButtons from './FeatureLaunchButtons/FeatureLaunchButtons'

const Wrapper = styled.div`
    max-width: 100%;
    padding: 0 2rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
`

const learningCenterFeature = props => {
  return (
    <Wrapper
        className='learning-center--feature'
        >
        <FeatureStackCount
            count={props.count}
            />
        <FeatureLaunchButtons
            count={props.count}
            launchFlashcards={props.launchFlashcards}
            />
    </Wrapper>
  )
}

export default learningCenterFeature
