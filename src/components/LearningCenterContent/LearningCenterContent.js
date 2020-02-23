import React from 'react'
import LearningCenterStacks from './LearningCenterStacks/LearningCenterStacks'
import LearningCenterLaunchButtons from './LearningCenterLaunchButtons/LearningCenterLaunchButtons'
import { ContentBlock, Header } from '../UI'

const learningCenterContent = props => {
  return (
    <ContentBlock
      className={'learning-center--content'}
      >
        <Header
            className='learning-center--header'
            >
            Cocktail Learning Center
        </Header>
        <LearningCenterStacks
            className='learning-center--stacks'
            launchFlashcards={props.launchFlashcards}
            />
        <LearningCenterLaunchButtons
            className='learning-center--launch-buttons'
            launchFlashcards={props.launchFlashcards}
            />
    </ContentBlock>
  )
}

export default learningCenterContent
