import * as actionTypes from './actionTypes'
import { database } from './firebase'

export const addIngredientSuccess = (ingredients) => {
    return {
        type: actionTypes.ADD_INGREDIENT_SUCCESS
    }
}

export const addIngredientStart = () => {
    return {
        type: actionTypes.ADD_INGREDIENT_START
    }
}

export const addIngredientFail = (error) => {
    return {
        type: actionTypes.ADD_INGREDIENT_FAIL,
        error: error
    }
}

export const addIngredient = (ingredientNode, databaseRefArray, tier) => {
    return dispatch => {
        dispatch(addIngredientStart())

        if ([0, 1, 2].indexOf(tier) === -1) {
            return dispatch(addIngredientFail('Add Ingredients Failed At Array Length'))
        }

        const rootRef = database.ref()
        let nodeRef = null
        const setRef = (i, tier, ref, dbRefArray) => {
            if (i <= tier) {
                ref = ref.child(dbRefArray[i])
                return setRef(i + 1, tier, ref, dbRefArray)
            } else {
                return ref
            }
        }
        
        nodeRef = setRef(0, tier, rootRef, databaseRefArray)
        nodeRef.update(ingredientNode, error => {
            if (error) {
                return dispatch(addIngredientFail(error))
            } else {
                return dispatch(fetchIngredients())
            }
        })
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = (errorCode) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        errorCode: errorCode,
    }
}

export const fetchIngredients = () => {
    const ingredientsRef = database.ref().child('ingredients')
    return dispatch => {
        ingredientsRef.once('value', snapshot => {
            return dispatch(setIngredients(snapshot.val()))
        }, errorObject => {
            return dispatch(fetchIngredientsFailed(errorObject.code))
        })
    }
}