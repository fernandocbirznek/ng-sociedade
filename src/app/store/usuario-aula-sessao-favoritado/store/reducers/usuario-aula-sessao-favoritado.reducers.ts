import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/usuario-aula-sessao-favoritado.actions';

import { 
  TipoSessaoAulaEnum,
  UsuarioAulaSessaoFavoritadoModel
} from 'src/app/models';

export const usuarioAulaSessaoFavoritadoFeatureKey = 'usuario-aula-sessao-favorita';

export interface UsuarioAulaSessaoFavoritadoState {
    itens: UsuarioAulaSessaoFavoritadoModel[];
    tipoSessaoAulaEnum: TipoSessaoAulaEnum;

    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const usuarioAulaSessaoFavoritadoInitialState: UsuarioAulaSessaoFavoritadoState = {
    itens: [],
    tipoSessaoAulaEnum: TipoSessaoAulaEnum.None,

    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: ""
};

export const usuarioAulaSessaoFavoritadoReducer = createReducer(
    usuarioAulaSessaoFavoritadoInitialState,

  on(actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdSuccess, (state, action) => {

    return { 
        ...state, 
        itens: action.response,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar as sessões favoritadas" 
    };
  }),

  on(actions.inserirUsuarioAulaSessaoFavoritado, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.inserirUsuarioAulaSessaoFavoritadoSuccess, (state, action) => {
    let itens = [...state.itens];
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
  on(actions.inserirUsuarioAulaSessaoFavoritadoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao inserir a sessão aos favoritados" 
    };
  }),

  on(actions.removerUsuarioAulaSessaoFavoritado, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.removerUsuarioAulaSessaoFavoritadoSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

    return {
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.removerUsuarioAulaSessaoFavoritadoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao remover a sessão dos favoritados" 
    };
  }),

  on(actions.alterarTipoSessaoAulaEnum, (state, action) => {
    return { 
        ...state, 
        tipoSessaoAulaEnum: action.tipoSessaoAulaEnum
    };
  }),
);
