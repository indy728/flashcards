import axios from 'axios'
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
        const authData = {
            email: authInfo.email,
            password: authInfo.password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if (!authInfo.isSignUp) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        axios.post(url + process.env.REACT_APP_API_KEY, authData)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                // setting local storage so user can refresh and return to page, maintaining authentication
                // localStorage is built into native JS
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(checkAuthTimeout(res.data.expiresIn))
                if (authInfo.isSignUp) {
                    // TO DO
                    // • push user info to firebase
                } else {
                    // TO DO
                    // • retrieve user info from firebase
                }
            })
            .catch(er => {
                dispatch(authFail(er.response.data.error))                
            })
    }
}

export const logout = () => {
    console.log('[logout]')
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}