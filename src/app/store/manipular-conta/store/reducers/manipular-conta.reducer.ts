import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/manipular-conta.actions';

export const manipularContaFeatureKey = 'manipularConta';

export interface ManipularContaState {
  email_usuario: string;
	nome_usuario: string;
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
  token: string;
}

export const manipularContaInitialState: ManipularContaState = {
  email_usuario: "",
	nome_usuario: "",
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
  token: ""
};

export const manipularContaReducer = createReducer(
  manipularContaInitialState,

  on(actions.criarConta, state => {
    return { ...state, isLoading: true, isSuccess: false, isFailure: false, error: "" };
  }),
  on(actions.criarContaSuccess, (state, action) => {
    return { ...state, login_usuario: action.conta.email_usuario, nome_usuario: action.conta.nome_usuario, isLoading: false, isSuccess: true, isFailure: false, mensagem: action.response.mensagem };
  }),
  on(actions.criarContaFailure, (state, action) => {
    return { ...state, isLoading: false, isSuccess: false, isFailure: true, mensagem: "Falha em criar conta" };
  }),
  on(actions.loginConta, state => {
    return { ...state, isLoading: true, isSuccess: false, isFailure: false, error: "" };
  }),
  on(actions.loginContaSuccess, (state, action) => {
    return { 
      ...state, 
      login_usuario: action.response.email, 
      nome_usuario: action.response.nome, 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: action.response.mensagem,
      token: action.response.token 
    };
  }),
  on(actions.loginContaFailure, (state, action) => {
    return { ...state, isLoading: false, isSuccess: false, isFailure: true, mensagem: action.response.mensagem };
  }),
  on(actions.deletarConta, state => {
    return { ...state, isLoading: true, isSuccess: false, isFailure: false, error: "" };
  }),
  on(actions.deletarContaSuccess, (state, action) => {
    return { 
      ...state, 
      login_usuario: "", 
      nome_usuario: "", 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: action.response.mensagem,
      token: ""
    };
  }),
  on(actions.deletarContaFailure, (state, action) => {
    return { ...state, isLoading: false, isSuccess: false, isFailure: true, mensagem: action.response.mensagem };
  }),
  on(actions.deslogarConta, state => {
    return { 
      ...state, 
      login_usuario: "", 
      nome_usuario: "", 
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: "Conta deslogada com sucesso",
      token: ""
    };
  }),
);
