import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import styled from 'styled-components'
import { Button } from '../../UI'

const Wrapper = styled.div`
    width: 60rem;
    margin: 5rem 0;
    padding: 0 5rem;
    border: 1px solid ${props => props.theme.palette.grayscale[6]};
`

class StackManager extends Component {
  state = {

  }

  render() {
    return(
      <Wrapper>
          <Button>
                View Stack
            </Button>
            <Button>
                Add By Name
            </Button>
            <Button>
                Add By Ingredient
            </Button>
            <Button>
                Add All
            </Button>
            <div>
                Add <input></input> Random Flashcards
                <Button>
                    Add
                </Button>
            </div>
            <Button>
                Clear Stack
            </Button>
      </Wrapper>
    )
  } 
}

export default StackManager
