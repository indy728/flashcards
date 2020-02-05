import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    cocktails: null,
    error: null,
    loading: true,
}

const addCocktailStart = state => {
    return updateObject(state, {error: null, loading: true})
}

const addCocktailFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const setCocktails = (state, action) => {
    const updatedState = {
        cocktails: action.cocktails,
        error: false,
        loading: false
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COCKTAIL_START: return addCocktailStart(state)
        case actionTypes.ADD_COCKTAIL_SUCCESS: return setCocktails(state, action)
        case actionTypes.ADD_COCKTAIL_FAIL: return addCocktailFail(state, action)
        case actionTypes.EDIT_COCKTAIL: return 
        case actionTypes.REMOVE_COCKTAIL: return 
        case actionTypes.SET_COCKTAILS: return setCocktails(state, action)
        case actionTypes.FETCH_COCKTAILS_FAILED: return
        default: return state
    }
}

export default reducer
