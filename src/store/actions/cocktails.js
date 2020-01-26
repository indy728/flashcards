import * as actionTypes from './actionTypes'
import { database } from './firebase'
import { updateObject } from '../../shared/utility'

export const addCocktailSuccess = (cocktails) => {
    return {
        type: actionTypes.ADD_COCKTAIL_SUCCESS
    }
}

export const addCocktailStart = () => {
    return {
        type: actionTypes.ADD_COCKTAIL_START
    }
}

export const addCocktailFail = (error) => {
    return {
        type: actionTypes.ADD_COCKTAIL_FAIL,
        error: error
    }
}

export const addCocktail = cocktail => {
    return dispatch => {
        dispatch(addCocktailStart())

        const rootRef = database.ref()
        const indexRef = rootRef.child("cocktailIndex")
        indexRef.update(cocktail, error => {
            if (error) {
                return dispatch(addCocktailFail(error))
            } else {
                return dispatch(fetchCocktails())
            }
        })
    }
}

export const removeCocktail = cocktail => {
    return {
        type: actionTypes.REMOVE_COCKTAIL,
        cocktail
    }
}

export const setCocktails = cocktails => {
    return {
        type: actionTypes.SET_COCKTAILS,
        cocktails: cocktails,
    }
}

export const fetchCocktailsFailed = error => {
    return {
        type: actionTypes.FETCH_COCKTAILS_FAILED,
        error
    }
}

export const fetchCocktails = () => {
    const cocktailsRef = database.ref().child('cocktailIndex')
    return dispatch => {
        cocktailsRef.once('value', snapshot => {
            return dispatch(setCocktails(snapshot.val()))
        }, errorObject => {
            return dispatch(fetchCocktailsFailed(errorObject.code))
        })
    }
}