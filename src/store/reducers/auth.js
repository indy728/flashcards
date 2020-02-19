import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/objectUtility'

const initialState = {
    userInfo: null,
    uid: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const authStart = state => {
    return updateObject(state, {error: null, loading: true})
}

const authFail = (state, action) => {
    const failState = updateObject(initialState, {
        error: action.error
    })

    return updateObject(state, failState)
}

const authLogout = (state) => {
    return updateObject(state, initialState)
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const setUserInfo = (state, action) => {
    const updatedState = {
        uid: action.uid,
        userInfo: action.userInfo,
        error: null,
        loading: false
    }
    return updateObject(state, updatedState)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        case actionTypes.SET_USER_INFO: return setUserInfo(state, action)
        case actionTypes.FETCH_USER_INFO_FAIL: return authFail(state, action)
        case actionTypes.NEW_USER_FAIL: return authFail(state, action)
        default: return state
    }
}

export default reducer
