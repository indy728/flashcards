import React from 'react'
import styled from 'styled-components'
import Logo from '../../../Logo/Logo'

const Wrapper = styled.div`
    width: 10rem;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`

const Hamburger = styled.div`
    width: 4rem;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 1.3rem 0;
    box-sizing: border-box;

    div {
        width: 90%;
        height: 2px;
        background-color: ${props => props.theme.palette.white[1]};
    }

    /* @media (min-width: 500px) {
        display: none;
    } */

`

const drawerToggle = (props) => {
    return (
        <Wrapper onClick={props.clicked}>
            <Hamburger>
                <div />
                <div />
                <div />
            </Hamburger>
            <Logo />
        </Wrapper>
    )
}

export default drawerToggle
