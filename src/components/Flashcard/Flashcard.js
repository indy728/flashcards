import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 25rem;
    height: 10rem;
    margin: 1rem;
    background: ${props => props.theme.palette.grayscale[5]};
`

const Flashcard = () => {
    return (
        <React.Fragment>
            <Wrapper />
        </React.Fragment>
    )

}

export default Flashcard
