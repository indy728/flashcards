import * as actionTypes from './actionTypes'
import { firebaseAuth } from './firebase'

// Use this function to set 'loading' state and potentially promp Spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (displayName, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: displayName,
        email: email
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
        if (authInfo.isSignUp) {
            firebaseAuth.createUserWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    // const user = res.user
                    // TO DOs
                    // Fix this shit below
                    // 
                    // user.updateProfile({displayName: authInfo.username})
                    //     .then(res => {
                    //         console.log('[actions/auth] signUp update success', res)
                    //     })
                    //     .catch(er => {
                    //         console.log('[actions/auth] signUp update fail')
                    //     })
                    dispatch(authSuccess(res.user.displayName, res.user.email))
                })
                .catch(er => {
                    dispatch(authFail(er.response.data.error))
                })
        } else {
            firebaseAuth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    const user = res.user
                    const userObj = {
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                    }
                    // console.log(userObj)
                    dispatch(authSuccess(res.user.displayName, res.user.email))
                })
                .catch(error => {
                    dispatch(authFail(error))
                })
        }
    }
}

export const logout = () => {
    console.log('[logout]')
    firebaseAuth.signOut()
        .then(() => console.log('[actions/auth] logout: signout success'))
        .catch(er => console.log('[actions/auth] er:', er))
    return {
        type: actionTypes.AUTH_LOGOUT
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
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                dispatch(authSuccess(user.displayName, user.email))
            } else {
                dispatch(logout())
            }
        })
    }
}