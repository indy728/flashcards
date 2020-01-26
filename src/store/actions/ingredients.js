import * as actionTypes from './actionTypes'
import { database, firebaseRefByArray } from './firebase'
import { updateObject } from '../../shared/utility'

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

const addItemToIndex = (rootRef, ingredientRefArray, id) => {
    return dispatch => {
        const indexRef = rootRef.child("elementIndex")
        let refObj = {}
        
        for (let i in ingredientRefArray) {
            refObj = updateObject(refObj, {
                [i]: ingredientRefArray[i]
            })
        }

        const indexNode = {
            [id]: {
                ref: refObj
            }
        }

        indexRef.update(indexNode, error => {
            if (error) {
                return dispatch(addIngredientFail(error))
            }
        })
    }
}

export const addIngredient = (ingredientNode, ingredientRefArray, id) => {
    return dispatch => {
        dispatch(addIngredientStart())

        if (!ingredientRefArray || ingredientRefArray.length < 1 || ingredientRefArray.length > 3) {
            return dispatch(addIngredientFail('Add Ingredients Failed At Array Length'))
        }

        const rootRef = database.ref()
        let nodeRef = firebaseRefByArray(rootRef, ingredientRefArray)

        nodeRef.update(ingredientNode, error => {
            if (error) {
                return dispatch(addIngredientFail(error))
            } else {
                if (ingredientRefArray.length === 3) {
                    dispatch(addItemToIndex(rootRef, ingredientRefArray, id))
                }
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