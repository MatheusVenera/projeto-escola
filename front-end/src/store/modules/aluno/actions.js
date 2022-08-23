import * as types from '../types'
export function cadastroAlunoRequest(payload) {
    return {
        type: types.CADASTRO_ALUNO_REQUEST,
        payload
    }
}

export function cadastroAlunoSuccess(payload) {
    return {
        type: types.CADASTRO_ALUNO_SUCCESS,
        payload
    }
}
export function cadastroAlunoFailure(payload) {
    return {
        type: types.CADASTRO_ALUNO_FAILURE,
        payload
    }
}

export function updateAlunoRequest(payload) {
    return {
        type: types.UPDATE_ALUNO_REQUEST,
        payload
    }
}

export function updateAlunoSuccess(payload) {
    return {
        type: types.UPDATE_ALUNO_SUCCESS,
        payload
    }
}

export function updateAlunoFailure(payload) {
    return {
        type: types.UPDATE_ALUNO_FAILURE,
        payload
    }
}