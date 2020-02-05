import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../UI'

const Wrapper = styled.div`
    width: 60rem;
    height: 100%;
    display: flex;
    /* align-items: flex-start; */
    justify-content: space-around;
`

const FeatureLaunchButton = styled(Button)`
    width: 20rem;
    height: 5rem;
    border: 2px outset ${props => props.theme.palette.grayscale[4]};

    :hover {
        background-color: ${props => props.theme.palette.secondary[3]};
    }
`

const featureLaunchButtons = props => {
    return (
        <Wrapper
            className='learning-center--feature__launch-buttons'
            >
            <FeatureLaunchButton
                className='learning-center--feature__launch-button'
                clicked={props.launchFlashcards}
                >
                View Flashcards
            </FeatureLaunchButton>
            <FeatureLaunchButton
                className='learning-center--feature__launch-button'
                >
                Take Quiz
            </FeatureLaunchButton>
        </Wrapper>
    )
}

export default featureLaunchButtons
