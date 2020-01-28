import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    ingredients: null,
    error: null,
    loading: true,
}

const addIngredientStart = state => {
    return updateObject(state, {error: null, loading: true})
}

const addIngredientFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const setIngredients = (state, action) => {
    const updatedState = {
        ingredients: action.ingredients,
        error: false,
        loading: false
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT_START: return addIngredientStart(state)
        case actionTypes.ADD_INGREDIENT_SUCCESS: return setIngredients(state, action)
        case actionTypes.ADD_INGREDIENT_FAIL: return addIngredientFail(state, action)
        case actionTypes.REMOVE_INGREDIENT: return 
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return
        default: return state
    }
}

export default reducer
