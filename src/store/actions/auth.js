import * as actionTypes from './actionTypes'
import { firebaseAuth, database } from './firebase'

// Use this function to set 'loading' state and potentially promp Spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = () => {
    return { type: actionTypes.AUTH_SUCCESS }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const newUserStart = () => {
    return { type: actionTypes.NEW_USER_START }
}

export const newUserFail = error => {
    return {
        type: actionTypes.NEW_USER_FAIL,
        error
    }
}

const newUserSuccess = () => {
    return { type: actionTypes.NEW_USER_SUCCESS }
}

const newUser = (authInfo, user) => {
    const { uid } = user
    const usersRef = database.ref().child('users')
    const newUser = {
        [uid]: { ...authInfo.userInfo }
    }
    console.log('[auth] newUser: ', newUser)
    
    return dispatch => {
        dispatch(newUserStart())

        usersRef.update(newUser, error => {
            if (error) {
                dispatch(newUserFail(error))
                dispatch(logout())
            } else {
                dispatch(newUserSuccess())
                dispatch(setUserInfo(uid, newUser.uid))
            }
        })
    }
}

// function for authenticating the user
export const auth = authInfo => {
    console.log('[auth] authInfo: ', authInfo)
    return dispatch => {
        dispatch(authStart())
        if (authInfo.isSignUp) {
            firebaseAuth.createUserWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    dispatch(authSuccess())
                    dispatch(newUser(authInfo, res.user))
                })
                .catch(er => {
                    dispatch(authFail(er.message))
                })
        } else {
            firebaseAuth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
                .then(res => {
                    dispatch(authSuccess())
                    dispatch(fetchUserInfo(res.user.uid))
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
                dispatch(authSuccess())
                dispatch(fetchUserInfo(user.uid))
            } else {
                dispatch(logout())
            }
        })
    }
}

export const setUserInfo = (uid, userInfo) => {
    return {
        type: actionTypes.SET_USER_INFO,
        uid,
        userInfo
    }
}

const fetchUserInfoSuccess = () => {
    return {
        type: actionTypes.FETCH_USER_INFO_SUCCESS,
    }
}

const fetchUserInfoFail = error => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAIL,
        error
    }
}

export const fetchUserInfo = uid => {
    const userRef = database.ref().child('users').child(uid)
    return dispatch => {
        userRef.once('value', snapshot => {
            dispatch(fetchUserInfoSuccess())
            return dispatch(setUserInfo(uid, snapshot.val()))
        }, errorObject => {
            console.log('[auth] errorObject: ', errorObject)
            return dispatch(fetchUserInfoFail(errorObject.code))
        })
    }
}