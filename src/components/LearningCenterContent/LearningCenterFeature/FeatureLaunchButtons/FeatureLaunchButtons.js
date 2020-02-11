import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../UI'
import { inherits } from 'util'

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

    background-image: ${props => props.disabled 
    ? "repeating-linear-gradient(-60deg, rgba(216, 216, 216, 0.3), rgba(216, 216, 216, 0.3) 1.5rem, rgba(76, 76, 76, 0.68) 1.5rem, rgba(76, 76, 76, 0.68) 3rem)"
    : 'none'};

    :hover {
        background-color: ${props => props.disabled
            ? 'inherit'
            : props.theme.palette.secondary[3]
        };
        
    }
`

const featureLaunchButtons = props => {
    console.log('[FeatureLaunchButtons] disabled?: ', props.count < 1)
    console.log('[FeatureLaunchButtons] props.count: ', props.count)

    return (
        <Wrapper
            className='learning-center--feature__launch-buttons'
            >
            <FeatureLaunchButton
                className='learning-center--feature__launch-button'
                disabled={props.count < 1}
                clicked={props.launchFlashcards}
                >
                View Flashcards
            </FeatureLaunchButton>
            <FeatureLaunchButton
                className='learning-center--feature__launch-button'
                disabled={props.count < 1}
                >
                Take Quiz
            </FeatureLaunchButton>
        </Wrapper>
    )
}

export default featureLaunchButtons
