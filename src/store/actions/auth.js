import axios from 'axios'
import * as actionTypes from './actionTypes'

// Use this function to set 'loading' state and potentially promp Spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = error => {
    return {
        types: actionTypes.AUTH_FAIL,
        error: error
    }
}

// function for authenticating the user
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if (!isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        axios.post(url + process.env.REACT_APP_API_KEY, authData)
            .then(res => {
                console.log(res)
                dispatch(authSuccess(res.data))
            })
            .catch( er => {
                console.log(er)
                dispatch(authFail())                
            })
    }
}