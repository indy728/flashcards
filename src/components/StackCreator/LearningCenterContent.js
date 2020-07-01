import React from 'react'
import LearningCenterFeature from './LearningCenterFeature/LearningCenterFeature'
import StackManager from './StackManager/StackManager'

import { ContentBlock, Header } from '../UI'

const learningCenterContent = props => {
  return (
    <ContentBlock
      className={'learning-center--content'}>
        <Header
            className='learning-center--header'
            >
            Cocktail Learning Center
        </Header>
        <LearningCenterFeature 
            count={props.count}
            launchFlashcards={props.launchFlashcards}
            />
        <StackManager
          viewCocktails={props.viewCocktails}
          />
    </ContentBlock>
  )
}

export default learningCenterContent
