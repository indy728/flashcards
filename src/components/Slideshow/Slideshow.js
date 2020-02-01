import React from 'react'
import styled from 'styled-components'
import SlideshowControlButton from './SlideshowControlButton/SlideshowControlButton'

const Wrapper = styled.div`
    width: 100%;
    height: 50rem;
    max-height: 100%;
    z-index: 500;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    display: flex;
`

const SlideshowFeature = styled.div`
    flex: 1;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    /* > * {
        transform: ${props => `translateX(calc(-100% * ${props.index}))`};
    } */
    /* background-color: orange; */
`

const slideshow = props => {

    return (
        <Wrapper
            className='slideshow'
            >
            <SlideshowControlButton
                className='slideshow--control-back'
                buttonSymbol='chevron-left'
                clicked={() => props.slideshowControls(-1)}
                />
            <SlideshowFeature>
                {props.feature}
            </SlideshowFeature>
            <SlideshowControlButton
                className='slideshow--control-forward'
                buttonSymbol='chevron-right'
                clicked={() => props.slideshowControls(1)}
                />
        </Wrapper>
    )
}

export default slideshow