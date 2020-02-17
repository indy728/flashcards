import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../UI'

const Wrapper = styled(Button)`
    width: 20rem;
    height: 5rem;
    justify-content: center;
    font-weight: bold;
    font-size: 1.6rem;
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

const learningCenterLaunchButton = props => {
    return (
        <Wrapper
            className='learning-center--launch-buttons__button'
            {...props}
            >
        </Wrapper>
    )
}

export default learningCenterLaunchButton
