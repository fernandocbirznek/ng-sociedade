import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/manipular-conta.actions';
import { AreaInteresseModel, TipoUsuarioEnum, UsuarioModel } from 'src/app/models';

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
    usuario.usuarioAreaInteresses = action.response.usuarioAreaInteresses;
    usuario.sociedadeId = action.response.sociedadeId;
    usuario.tipoUsuario = action.response.tipoUsuario;

    switch(action.response.tipoUsuario) { 
      case TipoUsuarioEnum.UsuarioAdministrador: { 
        usuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioAdministrador;
        break; 
      } 
      case TipoUsuarioEnum.UsuarioProfessor: { 
        usuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioProfessor;
        break; 
      } 
      case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
        usuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioProfessorAdministrador;
        break; 
      } 
      case TipoUsuarioEnum.UsuarioComum: { 
        usuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioComum;
        break; 
      } 
      default: { 
        usuario.tipoUsuarioEnum = TipoUsuarioEnum.None;
        break; 
      } 
    }

    usuario.tipoUsuarioEnum = action.response.tipoUsuarioEnum;
    usuario.token = action.response.token;
    usuario.topicoForum = action.response.topicoForum;
    usuario.usuarioPerfilId = action.response.usuarioPerfilId;
    usuario.foto = action.response.foto;

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

  on(actions.atualizarUsuarioPerfil, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.atualizarUsuarioPerfilSuccess, (state, action) => {
    let usuario: UsuarioModel = {...state.usuario};
    
    usuario.foto = action.usuarioPerfil.foto ? action.usuarioPerfil.foto : undefined;
    usuario.hobbie = action.usuarioPerfil.hobbie ? action.usuarioPerfil.hobbie : '';
    usuario.dataNascimento = action.usuarioPerfil.dataNascimento ? action.usuarioPerfil.dataNascimento : undefined;
      
    return { 
        ...state, 
        usuario: usuario,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.atualizarUsuarioPerfilFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em atualizar o perfil" 
    };
  }),

  on(actions.inserirUsuarioAreaInteresse, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.inserirUsuarioAreaInteresseSuccess, (state, action) => {
    let usuario: UsuarioModel = new UsuarioModel();
    usuario.id = state.usuario.id;
    usuario.nome = state.usuario.nome;
    usuario.comentarioAula = state.usuario.comentarioAula;
    usuario.comentarioForum = state.usuario.comentarioForum;
    usuario.curtirAula = state.usuario.curtirAula;
    usuario.dataNascimento = state.usuario.dataNascimento;
    usuario.email = state.usuario.email;
    usuario.hobbie = state.usuario.hobbie;
    usuario.noticiaVisualizada = state.usuario.noticiaVisualizada;
    usuario.sociedadeId = state.usuario.sociedadeId;
    
    let usuarioAreaInteresse: AreaInteresseModel = new AreaInteresseModel();
    usuarioAreaInteresse.id = action.usuarioAreaInteresse.areaInteresseId;
    usuarioAreaInteresse.nome = action.usuarioAreaInteresse.areaInteresseNome;

    usuario.usuarioAreaInteresses.push(usuarioAreaInteresse);

    return { 
        ...state, 
        usuario: usuario,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.inserirUsuarioAreaInteresseFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em adicionar area de interesse do usuário" 
    };
  }),

  on(actions.removerUsuarioAreaInteresse, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.removerUsuarioAreaInteresseSuccess, (state, action) => {
    let usuario: UsuarioModel = {...state.usuario};
    
    usuario.usuarioAreaInteresses = 
      usuario
        .usuarioAreaInteresses
        .filter(item => item.id == action.usuarioAreaInteresse.areaInteresseId);

    return { 
        ...state, 
        usuario: usuario,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.removerUsuarioAreaInteresseFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em remover area de interesse do usuário" 
    };
  }),
);
