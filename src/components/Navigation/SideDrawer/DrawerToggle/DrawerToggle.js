import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 4rem;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;

    div {
        width: 90%;
        height: 3px;
        background-color: ${props => props.theme.palette.white[1]};
    }

    @media (min-width: 500px) {
        display: none;
    }

`

const drawerToggle = (props) => {
    return (
        <Wrapper onClick={props.clicked}>
            <div />
            <div />
            <div />
        </Wrapper>
    )
}

export default drawerToggle
