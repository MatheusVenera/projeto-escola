import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from '../types'
import axios from '../../../services/axios'
import { toast } from "react-toastify";
import history from '../../../services/history'
import { get } from 'lodash';

function* loginRequest({payload}) {
    const toastEnviando = toast.loading("Enviando dados...");
    try {
        const { email, password } = payload
        const response = yield call(axios.post, "/tokens/create", {email, password});
        yield put(actions.loginSuccess({ ...response.data }))
        console.log(response.data.token)
        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`

        toast.update(toastEnviando, {
            render: "Login realizado com sucesso!",
            type: "success",
            isLoading: false,
            closeButton: true,
            closeOnClick: true,
            draggable: true,
            autoClose: 3000,
        });
        history.push(payload.prevPath);
    } catch (e) {
        setTimeout(() => {
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
                    render: `Ocorreu um erro ao fazer login :/ ${e.response.status} ${e.response.statusText}`,
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
        }, 100);
    }
}

function persistRehydrate({payload}) {
    const token = get(payload, 'auth.token', '')
    if(!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
]);