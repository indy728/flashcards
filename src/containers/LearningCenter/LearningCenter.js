import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import LearningCenterContent from '../../components/LearningCenterContent/LearningCenterContent'
import Flashcards from '../../components/Flashcards/Flashcards'
import Stack from '../Stack/Stack'

import Modal from '../../components/UI/Modal/Modal'

class LearningCenter extends Component {
    state = {
    }

    render() {
        let modalContent = null
        const { manager, pool, count } = this.props.stack
        const { inFlashcards } = this.props.flashcards
        const modalOpen = inFlashcards || manager

        console.log('[LearningCenter] manager: ', manager)
        console.log('[LearningCenter] modalOpen: ', modalOpen)

        if (!this.props.loading) {
            if (inFlashcards) modalContent = <Flashcards />
            if (manager) modalContent = <Stack />
        } 
        return (
            <React.Fragment>
                <Modal
                    show={modalOpen}
                    modalClosed={this.props.viewerClosed}
                    >
                    {modalContent}
                </Modal>
                <LearningCenterContent 
                    count={count}
                    launchFlashcards={this.props.startFlashcards}
                    />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        stack: state.learning.stack,
        flashcards: state.learning.flashcards,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCocktails: () => dispatch(actions.fetchCocktails()),
        startFlashcards: () => dispatch(actions.startFlashcards()),
        viewerClosed: () => dispatch(actions.viewerClosed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningCenter)
