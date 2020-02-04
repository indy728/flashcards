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
import { shuffleArray } from '../../shared/arrayUtility'

const Wrapper = styled.div`
    /* width: 50rem; */
    padding: 0 5rem;
    width: 100%;
    display: flex;
    flex-flow: column;
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

const LearningCenterHeader = styled(Header)`
    width: 100%;
`

const LearningCenterManager = styled.div`
    width: 100%;
    height: 20rem;
    padding: 0 2rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;

    background-color: ${props => props.theme.palette.grayscale[5]};
`

const StackManager = styled.div`
    /* width: 56rem; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    height: 100%;
`

const StackCount = styled.div`
    font-size: 4.8rem;
    font-family: ${props => props.theme.fonts.script};
    /* display: flex;
    flex-direction: column; */

    > .count-line {

    } 
`

const StackManagementButtons = styled(Button)`

`

const StackQuizButtons = styled.div`
    width: 60rem;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    justify-content: space-around;
`

const StackQuizButton = styled(Button)`
    width: 20rem;
    height: 5rem;
    border: 2px outset ${props => props.theme.palette.grayscale[4]};

    :hover {
        background-color: ${props => props.theme.palette.secondary[3]};
    }
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
        this.setState(prevState => ({ inSlideshow: !prevState.inSlideshow }))
    }

    startSlideshow = () => {
        this.setState({
            inSlideshow: true,
            slideshowIndex: 0
        })
    }

    endSlideshow = () => {
        this.setState({
            inSlideshow: false,
            slideshowIndex: -1
        })
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

    render() {
        let flashcards = <Spinner />
        let controls = null
        let cocktailButtons = null;
        let addedCocktails = null;
        let nextBackButtons = null;
        let slideshow = null
        if (!this.props.loading) {
            const { cocktails } = this.props
            let cocktailKeys = Object.keys(cocktails)

            cocktailButtons = cocktailKeys.map(key => {
                const selected = this.state.slideshowFlashcardIDs.findIndex(element => element === key) !== -1
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
            if (this.state.inSlideshow)  {
                const slideshowArray = []

                this.state.slideshowFlashcardIDs.forEach(id => {
                    slideshowArray.push(
                        <Flashcard
                            key={id}
                            cocktail={cocktails[id]}
                            />
                    )
                })
                const featureFlashcard = slideshowArray[this.state.slideshowIndex]
                slideshow = (
                    <Modal show>
                        <Button
                            clicked={() => this.endSlideshow()}
                            >
                            X
                        </Button>
                        <Slideshow 
                            // flashcardArray={slideshowArray}
                            feature={featureFlashcard}
                            index={this.state.slideshowIndex}
                            slideshowControls={this.slideshowIndexChangeHandler}
                            />
                    </Modal>
                ) 
            }
            controls = (
                <React.Fragment>
                    <Button
                        disabled={this.state.flashcardCount < 1}
                        clicked={() => this.startSlideshow()}
                        >
                        Launch Flashcards
                    </Button>
                    <CocktailButtons>
                        {addedCocktails}
                    </CocktailButtons>
                        {/* this.state.inSlideshow {this.state.inSlideshow ? "true" : "false"}<br></br>
                        this.state.flashcardCount {this.state.flashcardCount}<br></br>
                        this.state.slideshowIndex {this.state.slideshowIndex}<br></br>
                        this.state.slideshowFlashcardIDs {this.state.slideshowFlashcardIDs.join('+')}<br></br> */}
                    <CocktailButtons>
                        {cocktailButtons}
                    </CocktailButtons>
                </React.Fragment>
            )
        } 
        return (
            <Wrapper className='flashcards'>
                <LearningCenterHeader
                    className='learning-center--header'
                    >
                    Cocktail Learning Center
                </LearningCenterHeader>
                <LearningCenterManager>
                    <StackManager>
                        <StackCount>
                                Current Stack: {this.state.flashcardCount} Cocktail Cards
                        </StackCount>
                    </StackManager>
                    <StackQuizButtons
                        className='learning-center--stack-quiz-buttons'
                        >
                        <StackQuizButton
                            className='learning-center--stack-quix-buttons__button'
                            >
                            View Flashcards
                        </StackQuizButton>
                        <StackQuizButton
                            className='learning-center--stack-quix-buttons__button'
                            quiz
                            >
                            Take Quiz
                        </StackQuizButton>
                    </StackQuizButtons>
                </LearningCenterManager>
                {/* <StackManagementButtons>
                            <Button>
                                View Stack
                            </Button>
                            <Button>
                                Clear Stack
                            </Button>
                        </StackManagementButtons> */}

                {controls}
                {slideshow}
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
