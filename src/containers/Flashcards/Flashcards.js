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

const initFlashcards = [
    {
        name: 'The Keeper',
        ingredients: [
            {
                name: 'vodka',
                qty: '1 1/2 oz',
            },
            {
                name: 'aperol',
                qty: '1/2 oz',
            },
            {
                name: 'honey syrup',
                qty: '1/2 oz',
            },
            {
                name: 'lemon juice',
                qty: '3/4 oz',
            },
        ],
        instructions: 'shake, strain, top with prosecco',
        glassware: 'coupe',
        garnish: 'lemon wheel'
    },
    // {
    //     name: 'Opening Statement',
    //     ingredients: [
    //         {
    //             name: 'gin',
    //             qty: '3/4 oz',
    //         },
    //         {
    //             name: "Kina L'Aero D'Or",
    //             qty: '3/4 oz',
    //         },
    //         {
    //             name: 'luxardo',
    //             qty: '3/4 oz',
    //         },
    //         {
    //             name: 'lemon juice',
    //             qty: '3/4 oz',
    //         },
    //         {
    //             name: 'orange bitters',
    //             qty: '2 dashes',
    //         },
    //     ],
    //     instructions: 'shake and strain',
    //     glassware: 'coupe',
    //     garnish: 'none'
    // },
]

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
            flashcards = <Modal show>
                <Slideshow />
            </Modal>
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
