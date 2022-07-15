import * as types from '../types'


const inicialState = {
    isLoading: false,
}

export default function(state = inicialState, action) {
    switch (action.type) {
        case types.CADASTRO_ALUNO_REQUEST: {
            const newState = {...state};
            newState.isLoading = true;
            return newState;
        }
        case types.CADASTRO_ALUNO_SUCCESS: {
            const newState = {...state};
            newState.isLoading = false;
            return newState;
        }
        case types.CADASTRO_ALUNO_FAILURE: {
            const newState = {...state};
            newState.isLoading = false;
            return newState;
        }
        default: {
            return state;
        }
    }
}