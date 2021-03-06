import * as actionTypes from './actionTypes'
import { database, firebaseRefByArray } from './firebase'
import { updateObject } from '../../shared/objectUtility'

export const addCocktailSuccess = () => {
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

const cocktailElementTwoWayReferenceUpdate = cocktail => {
    return dispatch => {
        const id = Object.keys(cocktail)[0]
        const elements = Object.keys(cocktail[id].elements)
        const rootRef = database.ref()
        const elementIndexRef = rootRef.child("elementIndex")

        elements.forEach(element => {
            elementIndexRef.child(element).once('value', snapshot => {
                let elementRefArray = snapshot.val().ref
                elementRefArray.push(element)
                let elementRef = firebaseRefByArray(rootRef, elementRefArray)
                elementRef.once('value', snapshot => {
                    let element = snapshot.val()
                    let cocktailTwoWayRef = element.cocktails ? element.cocktails : {}
                    cocktailTwoWayRef = updateObject(cocktailTwoWayRef, {
                        [id]: true
                    })
                    elementRef.child('cocktails').update(cocktailTwoWayRef, error => {
                        if (error) {
                            // SOMETHING
                            return dispatch(addCocktailFail(error))
                        }
                    })
                    // console.log('[cocktails] snapshot.val(): ', snapshot.val())
                })
            }, errorObject => {
                // ERROR FOR THIS SPECIFIC INSTANCE
            })
        })
        dispatch(addCocktailSuccess())
        return dispatch(fetchCocktails())
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
                return dispatch(cocktailElementTwoWayReferenceUpdate(cocktail))
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
        cocktails
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