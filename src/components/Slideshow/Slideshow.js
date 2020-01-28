import React from 'react'
import styled from 'styled-components'
import SlideshowControlButton from './SlideshowControlButton/SlideshowControlButton'

const Wrapper = styled.div`
    width: 100%;
    height: 50rem;
    max-height: 100%;
    z-index: 499;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    display: flex;
`



const SlideshowFeature = styled.div`
    flex: 1;
    height: 100%;
    background-color: orange;
`

const slideshow = props => {

    return (
        <Wrapper
            className='slideshow'
            >
            <SlideshowControlButton
                className='slideshow--control-back'
                buttonSymbol={'lol'}
                clicked={null}
                />
            <SlideshowFeature>
                {props.flashcardArray}
            </SlideshowFeature>
            <SlideshowControlButton
                className='slideshow--control-forward'
                buttonSymbol={'ror'}
                clicked={null}
                />
        </Wrapper>
    )
}

export default slideshow