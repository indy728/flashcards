import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    flashcards: {
        inFlashcards: false,
        flashcardsIndex: -1,
    },
    quiz: {
        inQuiz: false,
        quizIndex: -1
    },
    stack: {
        manager: false,
        count: 0,
        pool: [],
    }
}

const addToStack = (state, action) => {
    let updatedPool = [ ...state.stack.pool ];

    updatedPool = updatedPool.concat(action.pool)

    const updatedState = updateObject(state, {
        stack: updateObject(state.stack, 
            updateObject(state.stack, {
                count: updatedPool.length,
                pool: updatedPool
        }))
    })

    return updateObject(state, updatedState)
}

const removeFromStack = (state, action) => {
    let updatedPool = [ ...state.stack.pool ];

    updatedPool = updatedPool.filter(element => {
            return !action.pool.includes(element)
    })

    const updatedState = updateObject(state, {
        stack: updateObject(state.stack, 
            updateObject(state.stack, {
                count: updatedPool.length,
                pool: updatedPool
        }))
    })

    return updateObject(state, updatedState)
}

const startFlashcards = state => {
    return updateObject(state, {
        flashcards: {
            inFlashcards: true,
            flashcardsIndex: 0
        }
    })
}

const viewerClosed = state => {
    let updatedStack = { ...state.stack }

    updatedStack = updateObject(updatedStack, {
        manager: false
    })
    return updateObject(state, {
        flashcards: initialState.flashcards,
        quiz: initialState.quiz,
        stack: updatedStack
    })
}

const manageStack = state => {
    let updatedStack = { ...state.stack }

    updatedStack = updateObject(updatedStack, {
        manager: true
    })
    return updateObject(state, {
        stack: updatedStack
    })
}

const incrementFlashcardIndex = (state, action) => {
    let updatedFlashcardsIndex = state.flashcards.flashcardsIndex + action.increment
    console.log('[learning] action.increment: ', action.increment)
    console.log('[learning] updatedFlashcardsIndex: ', updatedFlashcardsIndex)

    if (updatedFlashcardsIndex > state.stack.count - 1) {
        updatedFlashcardsIndex = 0
    } else if (updatedFlashcardsIndex < 0) {
        updatedFlashcardsIndex = state.stack.count - 1
    }
    return updateObject(state, {
        flashcards: updateObject(state.flashcards, {
            flashcardsIndex: updatedFlashcardsIndex
        })
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_STACK: return addToStack(state, action)
        case actionTypes.REMOVE_FROM_STACK: return removeFromStack(state, action)
        case actionTypes.START_FLASHCARD: return startFlashcards(state)
        case actionTypes.VIEWER_CLOSED: return viewerClosed(state)
        case actionTypes.MANAGE_STACK: return manageStack(state)
        case actionTypes.INCREMENT_FLASHCARD_INDEX: return incrementFlashcardIndex(state, action)
        default: return state
    }
}

export default reducer
