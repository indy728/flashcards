import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../UI'

const Wrapper = styled.div`
    

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        width: 60rem;
        height: 100%;
        justify-content: space-around;
    }
    /* align-items: flex-start; */
`

const FeatureLaunchButton = styled(Button)`
    width: 20rem;
    height: 5rem;
    border: 2px outset ${({ theme }) => theme.palette.grayscale[4]};

    background-image: ${props => props.disabled 
    ? props.theme.palette.disabled
    : 'none'};

    :hover {
        background-color: ${props => props.disabled
            ? 'inherit'
            : props.theme.palette.secondary[3]
        };
        
    }
`

const featureLaunchButtons = props => {
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
                disabled
                // disabled={props.count < 1}
                >
                Take Quiz
            </FeatureLaunchButton>
        </Wrapper>
    )
}

export default featureLaunchButtons
