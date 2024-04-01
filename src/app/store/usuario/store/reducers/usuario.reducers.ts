import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/usuario.actions';

import { 
  AreaInteresseModel,
  UsuarioAreaInteresseModel,
    UsuarioModel
} from 'src/app/models';

export const usuarioFeatureKey = 'usuario';

export interface UsuarioState {
    itens: UsuarioModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const usuarioInitialState: UsuarioState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: ""
};

export const usuarioReducer = createReducer(
    usuarioInitialState,

  on(actions.selecionarUsuarioById, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarUsuarioByIdSuccess, (state, action) => {
    let itens = [...state.itens];
    
    let usuario: UsuarioModel | undefined = itens.find(item => item.id == action.response.id);

    if (usuario)
        itens = itens.filter(item => item.id != action.response.id);

    itens.push(action.response);

    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarUsuarioByIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar perfil do usuário" 
    };
  }),
);
