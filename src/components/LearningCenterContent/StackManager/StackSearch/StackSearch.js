import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 15vh;
    min-height: 5rem;
    background-color: ${props => props.theme.palette.primary[2]};;

    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchBar = styled.div`
    flex: 0 0 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    > input {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        border: none;
        padding: .7rem 2rem;
        border-radius: 100px;
        width: 90%;
        height: 3rem;
        transition: all .2s;
        background-color: ${props => props.theme.palette.grayscale[5]};

        &:focus {
            outline: none;
            width: 100%;
            height: 3.6rem;
        }
    }
`

const StackSearch = props => {
    return (
        <Wrapper
            className='stack-search'>
            <SearchBar>
                <input />
            </SearchBar>
        </Wrapper>
    )
}

export default StackSearch
