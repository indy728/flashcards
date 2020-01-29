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

const CocktailButtons = styled.div`
    display: flex;
    flex-flow: column;
    width: 40rem;
    
`

const CocktailButton = styled.div`
    height: 2rem;
    width: 100%;
    border: 1px solid blue;
    font-weight: bold;
    background-color: ${props => props.selected ? 'red' : 'yellow'};
`

class Flashcards extends Component {
    state = {
        inSlideshow: false,
        flashcardCount: 0,
        slideshowIndex: -1,
        slideshowFlashcardIDs: []
    }

    componentDidMount() {
        if (this.props.cocktails === null) {
            this.props.onInitCocktails()
        }
    }

    inSlideshowToggle = () => {
        this.setState(prevState => ({ inSlideshow: !prevState }))
    }

    cocktailObjectToArray = cocktailObj => {
        let cocktailArray = Object.values(cocktailObj)
        console.log('[Flashcards] cocktailArray: ', cocktailArray)
        cocktailArray = shuffleArray(cocktailArray)
        console.log('[Flashcards] cocktailArray: ', cocktailArray)
        // this.setState({ cocktailArray })
        return cocktailArray
    }

    slideshowFlashcardIDsPushHandler = (id) => {
        let updatedSlideshowFlashcardIDs = [...this.state.slideshowFlashcardIDs]
        updatedSlideshowFlashcardIDs.push(id)
        this.setState({
            slideshowFlashcardIDs: updatedSlideshowFlashcardIDs,
            flashcardCount: updatedSlideshowFlashcardIDs.length
        })
    }

    slideshowFlashcardIDsRemoveHandler = (id) => {
        let updatedSlideshowFlashcardIDs = [...this.state.slideshowFlashcardIDs]
        console.log('[Flashcards] id: ', id)
        updatedSlideshowFlashcardIDs = updatedSlideshowFlashcardIDs.filter(key => key !== id)
        this.setState({
            slideshowFlashcardIDs: updatedSlideshowFlashcardIDs,
            flashcardCount: updatedSlideshowFlashcardIDs.length
        })
    }

    startSlideShowHandler = () => {
        this.setState({
            slideshowIndex: 0
        })
    }

    slideshowIndexChangeHandler = i => {
        const { flashcardCount } = this.state
        let updatedIndex = this.state.slideshowIndex
        updatedIndex += i
        if (updatedIndex < 0) { updatedIndex = flashcardCount - 1}
        if (updatedIndex >= flashcardCount) { updatedIndex = 0 }
        this.setState({ slideshowIndex: updatedIndex})
    }

    render() {
        let flashcards = <Spinner />
        let cocktailButtons = null;
        let addedCocktails = null;
        let nextBackButtons = null;
        if (!this.props.loading) {
            const { cocktails } = this.props
            let flashcardArray = (
                <Flashcard
                    key='keeper'
                    cocktail={this.props.cocktails['keeper']}
                    />
            )

            console.log('[Flashcards] this.props.cocktails: ', this.props.cocktails)
            
            let cocktailKeys = Object.keys(cocktails)
            cocktailButtons = cocktailKeys.map(key => {
                return (
                    <CocktailButton
                        key={key}
                        onClick={() => this.slideshowFlashcardIDsPushHandler(key)}
                        id={key}
                        selected={this.state.slideshowFlashcardIDs.findIndex(element => element === key) !== -1}
                        >
                        {cocktails[key].name}
                    </CocktailButton>
                )
            })
            addedCocktails = this.state.slideshowFlashcardIDs.map(key => {
                return (
                    <CocktailButton
                        key={key}
                        onClick={() => this.slideshowFlashcardIDsRemoveHandler(key)}
                        id={key}
                        // selected={this.state.slideshowFlashcardIDs.findIndex(element => element === key) !== -1}
                        >
                        {cocktails[key].name}
                    </CocktailButton>
                )
            })
            nextBackButtons = (
                <div>
                    <div onClick={() => this.slideshowIndexChangeHandler(-1)}>back</div>
                    <div onClick={() => this.slideshowIndexChangeHandler(1)}>next</div>
                </div>
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
                {/* {flashcards} */}
                <CocktailButtons>
                    {addedCocktails}
                </CocktailButtons>
                this.state.inSlideshow {this.state.inSlideshow ? "true" : "false"}<br></br>
                this.state.flashcardCount {this.state.flashcardCount}<br></br>
                this.state.slideshowIndex {this.state.slideshowIndex}<br></br>
                this.state.slideshowFlashcardIDs {this.state.slideshowFlashcardIDs.join('+')}<br></br>
                <CocktailButtons>
                    {cocktailButtons}
                </CocktailButtons>
                {nextBackButtons}
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
