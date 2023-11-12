import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/manipular-conta.actions';
import { UsuarioModel } from 'src/app/models';

export const manipularContaFeatureKey = 'manipularConta';

export interface ManipularContaState {
  usuario: UsuarioModel;
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const manipularContaInitialState: ManipularContaState = {
  usuario: new UsuarioModel(),
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
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
    let usuario = new UsuarioModel();
    usuario.nome = action.conta.nome;
    usuario.email = action.conta.email;

    return { 
      ...state,
      usuario: usuario,
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
    let usuario = new UsuarioModel();
    usuario.id = action.response.id;
    usuario.nome = action.response.nome;
    usuario.comentarioAula = action.response.comentarioAula;
    usuario.comentarioForum = action.response.comentarioForum;
    usuario.curtirAula = action.response.curtirAula;
    usuario.dataNascimento = action.response.dataNascimento;
    usuario.email = action.response.email;
    usuario.hobbie = action.response.hobbie;
    usuario.noticiaVisualizada = action.response.noticiaVisualizada;
    usuario.sociedadeId = action.response.sociedadeId;
    usuario.tipoUsuarioEnum = action.response.tipoUsuarioEnum;
    usuario.token = action.response.token;
    usuario.topicoForum = action.response.topicoForum;
    usuario.usuarioPerfilId = action.response.usuarioPerfilId;

    //TODO, falta a foto

    return { 
      ...state, 
      usuario: usuario,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false
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
