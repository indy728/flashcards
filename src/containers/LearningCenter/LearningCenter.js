import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import styled from 'styled-components'
import Flashcard from '../../components/Flashcard/Flashcard'
import Slideshow from '../../components/Slideshow/Slideshow'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'
import Header from '../../components/UI/Header/Header'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import { shuffleArray } from '../../shared/arrayUtility'
import LearningCenterContent from '../../components/LearningCenterContent/LearningCenterContent'

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
        // inSlideshow: false,
        // slideshowIndex: -1,
        // flashcardCount: 0,
        // slideshowFlashcardIDs: []
    }

    componentDidMount() {
        if (this.props.cocktails === null) {
            this.props.onInitCocktails()
        }
    }

    // inSlideshowToggle = () => {
    //     this.setState(prevState => ({ inSlideshow: !prevState.inSlideshow }))
    // }

    // startSlideshow = () => {
    //     this.setState({
    //         inSlideshow: true,
    //         slideshowIndex: 0
    //     })
    // }

    // endSlideshow = () => {
    //     this.setState({
    //         inSlideshow: false,
    //         slideshowIndex: -1
    //     })
    // }

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
        updatedSlideshowFlashcardIDs = updatedSlideshowFlashcardIDs.filter(key => key !== id)
        this.setState({
            slideshowFlashcardIDs: updatedSlideshowFlashcardIDs,
            flashcardCount: updatedSlideshowFlashcardIDs.length
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

    launchFlashcards

    render() {
        let flashcards = <Spinner />
        let controls = null
        let cocktailButtons = null;
        let addedCocktails = null;
        let nextBackButtons = null;
        let slideshow = null
        const { pool, count } = this.props.stack
        const { inSlideshow, slideshowIndex } = this.props.slideshow
        console.log('[LearningCenter] this.props.slideshow: ', this.props.slideshow)
        console.log('[LearningCenter] this.props.stack: ', this.props.stack)
        if (!this.props.loading) {
            const { cocktails } = this.props
            let cocktailKeys = Object.keys(cocktails)

            cocktailButtons = cocktailKeys.map(key => {
                const selected = pool.findIndex(element => element === key) !== -1
                return (
                    <CocktailButton
                        key={key}
                        onClick={selected ? null : () => this.slideshowFlashcardIDsPushHandler(key)}
                        id={key}
                        selected={selected}
                        >
                        {cocktails[key].name}
                    </CocktailButton>
                )
            })
            addedCocktails = pool.map(key => {
                return (
                    <CocktailButton
                        key={key}
                        onClick={() => this.slideshowFlashcardIDsRemoveHandler(key)}
                        id={key}
                        // selected={pool.findIndex(element => element === key) !== -1}
                        >
                        {cocktails[key].name}
                    </CocktailButton>
                )
            })
            if (inSlideshow)  {
                const slideshowArray = []

                pool.forEach(id => {
                    slideshowArray.push(
                        <Flashcard
                            key={id}
                            cocktail={cocktails[id]}
                            />
                    )
                })
                const featureFlashcard = slideshowArray[slideshowIndex]
                slideshow = (
                    <Modal show>
                        <Button
                            clicked={() => this.props.endSlideshow()}
                            >
                            X
                        </Button>
                        <Slideshow 
                            // flashcardArray={slideshowArray}
                            feature={featureFlashcard}
                            index={slideshowIndex}
                            slideshowControls={this.props.incrementSlideIndex}
                            />
                    </Modal>
                ) 
            }
            // controls = (
            //     <React.Fragment>
            //         <Button
            //             disabled={this.state.flashcardCount < 1}
            //             clicked={() => this.startSlideshow()}
            //             >
            //             Launch Flashcards
            //         </Button>
            //         <CocktailButtons>
            //             {addedCocktails}
            //         </CocktailButtons>
            //             {/* this.state.inSlideshow {this.state.inSlideshow ? "true" : "false"}<br></br>
            //             this.state.flashcardCount {this.state.flashcardCount}<br></br>
            //             this.state.slideshowIndex {this.state.slideshowIndex}<br></br>
            //             pool {pool.join('+')}<br></br> */}
            //         <CocktailButtons>
            //             {cocktailButtons}
            //         </CocktailButtons>
            //     </React.Fragment>
            // )
        } 
        return (
            <React.Fragment>
                {slideshow}
                <LearningCenterContent 
                    count={count}
                    launchFlashcards={this.props.startSlideshow}
                    />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        loading: state.cocktails.loading,
        stack: state.learning.stack,
        slideshow: state.learning.slideshow,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCocktails: () => dispatch(actions.fetchCocktails()),
        startSlideshow: () => dispatch(actions.startSlideshow()),
        endSlideshow: () => dispatch(actions.endSlideshow()),
        incrementSlideIndex: i => dispatch(actions.incrementSlideIndex(i))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcards)
// export default Flashcards
