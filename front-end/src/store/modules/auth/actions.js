import * as types from '../types'

//payload = objeto com os dados
export function LoginRequest(payload) {
    return {
        type: types.LOGIN_REQUEST,
        payload
    }
}
export function loginSuccess(payload) {
    return {
        type: types.LOGIN_SUCCESS,
        payload
    }
}
export function loginFailure(payload) {
    return {
        type: types.LOGIN_FAILURE,
        payload
    }
}
export function registerRequest(payload) {
    return {
        type: types.REGISTER_REQUEST,
        payload
    }
}

export function registerFailure(payload) {
    return {
        type: types.REGISTER_FAILURE,
        payload
    }
}

export function registerSuccess(payload) {
    return {
        type: types.REGISTER_SUCCESS,
        payload
    }
}