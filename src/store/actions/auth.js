import * as actionTypes from './actionTypes'
import { firebaseAuth, database } from './firebase'

// Use this function to set 'loading' state and potentially promp Spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (email, uid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email,
        uid
    }
    console.log('[auth] email: ', email)
    console.log('[auth] uid: ', uid)

    // return database.ref().child('users').child(uid).once('value', snapshot => {
    //     return {
    //         type: actionTypes.AUTH_SUCCESS,
    //         email,
    //         uid,
    //         userInfo: snapshot.val()
    //     }
    // }, errorObject => {
    //         // ERROR FOR THIS SPECIFIC INSTANCE
    //         return 
    // })
    
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

const newUser = (authInfo, user) => {
    const { username } = authInfo
    const { email, uid } = user
    const newUser = {
        [uid]: {
            email,
            username
        }
    }
    const usersRef = database.ref().child('users')

    // return dispatch => {
    //     usersRef.update(newUser, error => {
    //         if (error) {
    //             return dispatch(authFail(error))
    //         } else {
    //             console.log('[auth] newUser: ', newUser)
    //             // return dispatch(authSuccess(email, uid))
    //         }
    //     })
    // }
}

// function for authenticating the user
export const auth = authInfo => {
    return dispatch => {
        dispatch(authStart())
        if (authInfo.isSignUp) {
            firebaseAuth.createUserWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    console.log('[auth] authInfo: ', authInfo)
                    dispatch(newUser(authInfo, res.user))
                })
                .catch(er => {
                    dispatch(authFail(er.message))
                })
        } else {
            firebaseAuth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    console.log('[auth] res: ', res)
                    // dispatch(authSuccess(res.user))
                    dispatch(authSuccess(authInfo.email, res.user.uid))
                })
                .catch(error => {
                    dispatch(authFail(error))
                })
        }
    }
}

export const logout = () => {
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
                dispatch(authSuccess(user.email, user.uid))
            } else {
                dispatch(logout())
            }
        })
    }
}