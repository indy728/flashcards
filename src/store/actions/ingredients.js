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
        console.log(ingredientNode, databaseRefArray)
        const rootRef = database.ref()
        let nodeRef = null
        if (tier === 0) nodeRef = rootRef.child(databaseRefArray[0])
        else if (tier === 1) nodeRef = rootRef.child(databaseRefArray[0]).child(databaseRefArray[1])
        else if (tier === 2) nodeRef = rootRef.child(databaseRefArray[0]).child(databaseRefArray[1]).child(databaseRefArray[2])
        else return dispatch(addIngredientFail('Add Ingredients Failed At Array Length'))
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