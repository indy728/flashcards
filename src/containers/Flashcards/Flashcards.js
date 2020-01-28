import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import styled from 'styled-components'
import Flashcard from '../../components/Flashcard/Flashcard'
import Slideshow from '../../components/Slideshow/Slideshow'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import { shuffleArray } from '../../shared/arrayUtility'

const Wrapper = styled.div`
    /* width: 50rem; */
    padding: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

class Flashcards extends Component {
    state = {
        cocktailArray: null
    }

    componentDidMount() {
        if (this.props.cocktails === null) {
            this.props.onInitCocktails()
        }
    }

    cocktailObjectToArray = cocktailObj => {
        let cocktailArray = Object.values(cocktailObj)
        console.log('[Flashcards] cocktailArray: ', cocktailArray)
        cocktailArray = shuffleArray(cocktailArray)
        console.log('[Flashcards] cocktailArray: ', cocktailArray)
        // this.setState({ cocktailArray })
        return cocktailArray
    }

    render() {
        let flashcards = <Spinner />
        if (!this.props.loading) {
            // const cocktailArray = this.cocktailObjectToArray(this.props.cocktails)
            const cocktailArray = Object.keys(this.props.cocktails)
            
        // const { cocktails } = this.state
        // flashcards = cocktailArray.map(cocktail => {
        //     return (
        //         <Flashcard 
        //             key={cocktail}
        //             cocktail={this.props.cocktails[cocktail]}
        //             />
        //     )
        // })
            let flashcardArray = (
                <Flashcard
                    key='keeper'
                    cocktail={this.props.cocktails['keeper']}
                    />
            )


            flashcards = (
                <Modal show>
                    <Slideshow 
                        flashcardArray={flashcardArray}
                        />
                </Modal>
            ) 
        } 
        return (
            <Wrapper className='flashcards'>
                {flashcards}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        loading: state.cocktails.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCocktails: () => dispatch(actions.fetchCocktails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards)
// export default Flashcards
