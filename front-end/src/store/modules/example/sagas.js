import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from '../types'
import axios from 'axios'
export const requisicao = async function getData() {
    const response = await axios.get('http://localhost:3001/users/listarUsuarios');
    if(response.data) return response.data;
    return 'Nenhum usuário cadastrado';
}


function* exampleRequest() {
    try {
        yield call(requisicao)
        yield put(actions.clicaBotaoSuccess());
    } catch (e) {
        yield put(actions.clicaBotaoFailure());
    }
}

export default all([
    takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);