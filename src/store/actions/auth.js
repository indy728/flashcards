import axios from 'axios'
import axiosFlashcards from '../../axios-flashcards'
import * as actionTypes from './actionTypes'

// Use this function to set 'loading' state and potentially promp Spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// function for authenticating the user
export const auth = (authInfo) => {
    return dispatch => {
        dispatch(authStart())
        console.log(authInfo)
        const authData = {
            email: authInfo.email,
            password: authInfo.password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if (!authInfo.isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        axios.post(url + process.env.REACT_APP_API_KEY, authData)
            .then(res => {
                // setting local storage so user can refresh and return to page, maintaining authentication
                // localStorage is built into native JS
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                // dispatch(checkAuthTimeout(res.data.expiresIn))
                if (authInfo.isSignUp) {
                    // TO DO
                    // • push user info to firebase
                } else {
                    // TO DO
                    // • retrieve user info from firebase
                }
            })
            .catch(er => {
                console.log(er.message)
                dispatch(authFail(er.code))                
            })
    }
}