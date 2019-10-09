import React from 'react'
import cocktailLogo from '../../assets/logos/drink1.svg'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 1rem;
    height: 100%;

    img {
        height: 100%;
    }
`

const logo = () => {
    return (
        <Wrapper>
            <img src={cocktailLogo} alt="Cocktail Logo" />
        </Wrapper>
    )
}

export default logo
