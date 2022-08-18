import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from '../types'
import axios from '../../../services/axios'
import { toast } from 'react-toastify';
import history from '../../../services/history';
import { get } from 'lodash';

function* cadastroAlunoRequest({ payload }) {
    const toastEnviando = toast.loading("Enviando dados...");
    try {
        const response = yield call(axios.post, `/alunos/createAluno`, payload);
        if (payload.foto) {
            yield call(axios.post, `/fotos/save`, ({aluno_id: response.data.id, foto: payload.foto}), {headers: {'Content-Type': 'multipart/form-data'}});
        }
        yield put(actions.cadastroAlunoSuccess({ ...response.data }))
        toast.update(toastEnviando, {
            render: "Cadastro realizado com sucesso!",
            type: "success",
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            draggable: true,
            autoClose: 3000,
        });
        history.push(payload.prevPath);
    } catch (e) {
        yield put(actions.cadastroAlunoFailure({}))
        const errors = get(e, "response.data.errors", []);
        if (errors.length > 0) {
            errors.map((err) => {
                toast.update(toastEnviando, {
                    render: `${err}`,
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    closeOnClick: true,
                    draggable: true,
                    autoClose: 3000,
                });
            });
        } else {
            toast.update(toastEnviando, {
                render: `Um arro aconteceu ao cadastrar o aluno :/ ${e.response.status} ${e.response.statusText}`,
                type: "error",
                isLoading: false,
                closeButton: true,
                closeOnClick: true,
                autoClose: 3000,
            });
        }
    }
}

export default all([
    takeLatest(types.CADASTRO_ALUNO_REQUEST, cadastroAlunoRequest)]);