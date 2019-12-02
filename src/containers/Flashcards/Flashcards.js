import React, { Component } from 'react'
import styled from 'styled-components'
import Flashcard from '../../components/Flashcard/Flashcard'

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
        cocktails: []
    }

    componentDidMount() {
        this.setState({cocktails: initFlashcards})
    }

    render() {
        const { cocktails } = this.state
        const flashcards = cocktails.map(cocktail => {
            return (
                <Flashcard 
                    key={cocktail.name}
                    cocktail={cocktail}
                    />
            )
        })

        console.log(initFlashcards)
        return (
            <Wrapper className='flashcards'>
                {flashcards}
            </Wrapper>
        )
    }
}

export default Flashcards
