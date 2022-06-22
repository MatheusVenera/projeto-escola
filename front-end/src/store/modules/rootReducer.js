import { combineReducers } from 'redux';
import auth from './auth/reducer'
import aluno from './aluno/reducer'

export default combineReducers({
    auth: auth,
    aluno: aluno,
});