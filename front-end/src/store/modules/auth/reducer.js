import * as types from '../types'
import axios from '../../../services/axios'


const initialState = {
    isLoggedIn: false,
    token: false,
    user: {},
    isLoading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            const newState = {...state}
            newState.isLoggedIn = true;
            newState.token = action.payload.token;
            newState.user = action.payload.user;
            return newState;
        }
        case types.LOGIN_FAILURE: {
            delete axios.defaults.headers.Authorization;
            const newState = {...state}
            return newState;
        }
        default: {
            return state;
        }
    }
}