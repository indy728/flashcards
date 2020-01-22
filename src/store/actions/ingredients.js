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

export const addIngredient = (ingredientNode, ingredientRefArray, id) => {
    return dispatch => {
        dispatch(addIngredientStart())

        console.log('[ingredients] ingredientRefArray: ', ingredientRefArray)

        // if ([0, 1, 2].indexOf(tier) === -1) {
        if (!ingredientRefArray || ingredientRefArray.length < 1 || ingredientRefArray.length > 3) {
            return dispatch(addIngredientFail('Add Ingredients Failed At Array Length'))
        }

        const rootRef = database.ref()
        const indexRef = rootRef.child("elementIndex")
        let nodeRef = firebaseRefByArray(rootRef, ingredientRefArray)
        // const setRef = (i, tier, ref, dbRefArray) => {
        //     if (i <= tier) {
        //         ref = ref.child(dbRefArray[i])
        //         return setRef(i + 1, tier, ref, dbRefArray)
        //     } else {
        //         return ref
        //     }
        // }
        
        // nodeRef = setRef(0, tier, rootRef, ingredientRefArray)


        

        let refObj = {}
        // const refArray = ingredientRefArray.slice(0, ingredientRefArray.length - 1)
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
        console.log('[ingredients] ingredientNode: ', ingredientNode)
        console.log('[ingredients] nodeRef: ', nodeRef)


        indexRef.update(indexNode, error => {
            if (error) {
                return dispatch(addIngredientFail(error))
            }
        })
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