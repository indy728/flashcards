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