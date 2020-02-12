import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import LearningCenterContent from '../../components/LearningCenterContent/LearningCenterContent'
import Flashcards from '../../components/Flashcards/Flashcards'

import Modal from '../../components/UI/Modal/Modal'

class LearningCenter extends Component {
    state = {
        viewCocktails: false
    }

    componentDidMount() {
        if (this.props.cocktails === null) {
            this.props.onInitCocktails()
        }
    }

    viewCocktailsHandler = () => {
        this.setState({viewCocktails: true})
    }

    render() {
        let modalContent = null
        const { pool, count } = this.props.stack
        const { inFlashcards, flashcardsIndex } = this.props.flashcards
        const modalOpen = inFlashcards || this.state.viewCocktails

        if (!this.props.loading) {
            if (inFlashcards) modalContent = <Flashcards />
                // modalContent = (
                //     <Slideshow 
                //         // flashcardArray={flashcardArray}
                //         feature={featureFlashcard}
                //         index={flashcardsIndex}
                //         slideshowControls={this.props.incrementFlashcardIndex}
                //         />
                // ) 
            // } else if (this.state.viewCocktails) {
            //     let cocktailIDs = pool.map(id => 
            //         <div>
            //             {id}
            //         </div>
            //     )
            //     modalContent = (
            //         <div>
            //             {cocktailIDs}
            //         </div>
            //     )
            // }

        } 
        return (
            <React.Fragment>
                <Modal
                    show={modalOpen}
                    modalClosed={this.props.endFlashcards}
                    >
                    {modalContent}
                </Modal>
                <LearningCenterContent 
                    count={count}
                    launchFlashcards={this.props.startFlashcards}
                    viewCocktails={this.viewCocktailsHandler}
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
        flashcards: state.learning.flashcards,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCocktails: () => dispatch(actions.fetchCocktails()),
        startFlashcards: () => dispatch(actions.startFlashcards()),
        endFlashcards: () => dispatch(actions.endFlashcards()),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningCenter)
