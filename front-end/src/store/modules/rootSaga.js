import { all } from 'redux-saga/effects';

import auth from './auth/sagas'
import aluno from './aluno/sagas'

export default function* rootSaga() {
    return yield all([auth, aluno]);
}