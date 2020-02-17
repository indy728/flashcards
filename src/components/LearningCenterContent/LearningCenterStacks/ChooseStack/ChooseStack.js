import React from 'react'
import styled from 'styled-components'
import { Select } from '../../../UI'

const Wrapper = styled.div`
    height: 100%;
    justify-content: space-evenly;

    h3 {
        font-size: 3rem;
        font-family: ${({ theme }) => theme.fonts.script};
    }
`

const ListOptions = styled.div`
    width: 100%;
    margin: 1rem 0;
`

const ListSelect = styled(Select)`
    width: 25rem;
    border: 2px solid black;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    text-align-last: center;
    text-transform: uppercase;
    border-radius: 0;

    option {
        text-align: center;
    text-align-last: center;
    }

    :not(:first-child) {
        margin-top: 2rem;
    }
`

const chooseList = props => {
  return (
    <Wrapper
        className='stacks--choose-list'
        >
        <h3>
        Choose a List:
        </h3>
        <ListOptions>
            <form>
                <ListSelect>
                    <option hidden>Select List Source</option>
                </ListSelect>
                <ListSelect>
                    <option hidden>Select List</option>
                </ListSelect>
            </form>
        </ListOptions>
    </Wrapper>
  )
}

export default chooseList
