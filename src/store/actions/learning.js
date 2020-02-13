import * as actionTypes from './actionTypes'

export const addToStack = pool => {
    return {
        type: actionTypes.ADD_TO_STACK,
        pool
    }
}

export const removeFromStack = pool => {
    return {
        type: actionTypes.REMOVE_FROM_STACK,
        pool
    }
}

export const startFlashcards = () => {
    return {
        type: actionTypes.START_FLASHCARD,
    }
}

export const viewerClosed = () => {
    return {
        type: actionTypes.VIEWER_CLOSED,
    }
}

export const manageStack = () => {
    return {
        type: actionTypes.MANAGE_STACK
    }
}

export const incrementFlashcardIndex = increment => {
    return {
        type: actionTypes.INCREMENT_FLASHCARD_INDEX,
        increment
    }
}