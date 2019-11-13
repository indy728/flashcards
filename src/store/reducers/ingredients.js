import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    error: null,
    loading: true,
}

const addIngredientStart = state => {
    return updateObject(state, {error: null, loading: true})
}

// const addIngredientSuccess = (state, action) => {
//     return updateObject(state, {
//         ingredients: action.ingredients,
//         error: null,
//         loading: false
//     })
// }

const addIngredientFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

// const addIngredient = (state, action) => {
//     const updatedIngredients = updateObject(state.ingredients, action.ingredientNode)
//     const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient)
//     const updatedAddState = {
//         ingredients: updatedAddIngredients,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
//         building: true
//     }
//     return updateObject(state, updatedAddState)
// }

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
