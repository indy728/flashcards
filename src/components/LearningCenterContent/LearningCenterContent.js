import React from 'react'
import LearningCenterFeature from './LearningCenterFeature/LearningCenterFeature'
import StackManager from './StackManager/StackManager'

import { ContentBlock, Header } from '../UI'

const learningCenterContent = props => {
  return (
    <ContentBlock>
        <Header
            className='learning-center--header'
            >
            Cocktail Learning Center
        </Header>
        <LearningCenterFeature 
            flashcardCount={props.flashcardCount}
            />
        <StackManager />
    </ContentBlock>
  )
}

export default learningCenterContent
