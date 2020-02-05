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

export const startSlideshow = () => {
    return {
        type: actionTypes.START_SLIDESHOW,
    }
}

export const endSlideshow = () => {
    return {
        type: actionTypes.END_SLIDESHOW,
    }
}

export const incrementSlideIndex = increment => {
    return {
        type: actionTypes.INCREMENT_SLIDESHOW_INDEX,
        increment
    }
}