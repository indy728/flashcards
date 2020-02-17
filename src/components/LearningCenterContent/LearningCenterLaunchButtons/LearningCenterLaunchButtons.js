import React from 'react'
import styled from 'styled-components'
import LearningCenterLaunchButton from './LearningCenterLaunchButton/LearningCenterLaunchButton'

const Wrapper = styled.div`
    width: 100%;
    height: 20rem;
    margin-top: 1rem;
    justify-content: space-evenly;

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        width: 60rem;
        height: 10rem;
        flex-flow: row;
    }
`

const learningCenterLaunchButtons = props => {
    return (
        <Wrapper
            className='learning-center--launch-buttons'
            >
            <LearningCenterLaunchButton
                disabled={!props.listReady}
                clicked={props.launchFlashcards}
                >
                View Flashcards
            </LearningCenterLaunchButton>
            <LearningCenterLaunchButton
                disabled
                // disabled={props.count < 1}
                >
                Take Quiz
            </LearningCenterLaunchButton>
        </Wrapper>
    )
}

export default learningCenterLaunchButtons
