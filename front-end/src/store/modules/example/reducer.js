import * as types from '../types'
import { toast } from 'react-toastify';

const inicialState = {
    botaoClicado: false,
}

export default function(state = inicialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICADO_SUCCESS: {
            toast.success('Dados salvos com sucesso!')
            const newState = {...state};
            newState.botaoClicado = !newState.botaoClicado;
            return newState;
        }

        case types.BOTAO_CLICADO_FAILURE: {
            toast.error('Algo de errado aconteceu...')
            return state;
        }
            
        case types.BOTAO_CLICADO_REQUEST: {
            toast.info('Enviando os dados. Por favor, aguarde...')
            return state;
        }
        default: {
            return state;
        }
    }
}