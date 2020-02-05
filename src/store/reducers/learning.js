import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    slideshow: {
        inSlideshow: false,
        slideshowIndex: -1,
    },
    stack: {
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

const startSlideshow = state => {
    return updateObject(state, {
        slideshow: {
            inSlideshow: true,
            slideshowIndex: 0
        }
    })
}

const endSlideshow = state => {
    return updateObject(state, {
        slideshow: initialState.slideshow
    })
}

const incrementSlideIndex = (state, action) => {
    let updatedSlideshowIndex = state.slideshow.slideshow + action.increment

    if (updatedSlideshowIndex === state.stack.count - 1) {
        updatedSlideshowIndex = 0
    } else if (updatedSlideshowIndex < 0) {
        updatedSlideshowIndex = state.stack.count - 1
    }
    return updateObject(state, {
        slideshow: updateObject(state.slideshow, {
            slideshowIndex: updatedSlideshowIndex
        })
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_STACK: return addToStack(state, action)
        case actionTypes.REMOVE_FROM_STACK: return removeFromStack(state, action)
        default: return state
    }
}

export default reducer
