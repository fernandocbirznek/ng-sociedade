import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/manipular-conta.actions';

export const manipularContaFeatureKey = 'manipularConta';

export interface ManipularContaState {
  email: string;
	nome: string;
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
  token: string;
}

export const manipularContaInitialState: ManipularContaState = {
  email: "",
	nome: "",
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
  token: ""
};

export const manipularContaReducer = createReducer(
  manipularContaInitialState,

  on(actions.criarConta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.criarContaSuccess, (state, action) => {
    return { 
      ...state, 
      nome: action.conta.nome, 
      email: action.conta.email, 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false,
      mensagem: action.response.mensagem 
      };
  }),
  on(actions.criarContaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Falha em criar conta" 
    };
  }),
  on(actions.loginConta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.loginContaSuccess, (state, action) => {
    return { 
      ...state, 
      nome: action.response.nome, 
      email: action.response.email, 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: action.response.mensagem,
      token: action.response.token 
    };
  }),
  on(actions.loginContaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: action.response.mensagem 
    };
  }),
  on(actions.deletarConta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.deletarContaSuccess, (state, action) => {
    return { 
      ...state, 
      nome: "", 
      email: "", 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: action.response.mensagem,
      token: ""
    };
  }),
  on(actions.deletarContaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: action.response.mensagem
    };
  }),
  on(actions.deslogarConta, state => {
    return { 
      ...state, 
      email: "", 
      nome: "", 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: "Conta deslogada com sucesso",
      token: ""
    };
  }),
);
