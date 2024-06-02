import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/manipular-conta.actions';

import { 
  AreaInteresseModel, 
  TipoUsuarioEnum, 
  UsuarioAulaCurtidoModel, 
  UsuarioAulaFavoritadaModel, 
  UsuarioModel, 
  UsuarioNoticiaFavoritadoModel 
} from 'src/app/models';

import { GenericoHelpers } from 'src/app/componentes/genericos/helpers/generico.helper';

export const manipularContaFeatureKey = 'manipularConta';

export interface ManipularContaState {
  usuario: UsuarioModel | undefined;
  usuarioNoticiaFavoritado: UsuarioNoticiaFavoritadoModel[];
  usuarioAulaCurtido: UsuarioAulaCurtidoModel[];
  usuarioAulaFavoritada: UsuarioAulaFavoritadaModel[];

  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const manipularContaInitialState: ManipularContaState = {
  usuario: undefined,
  usuarioNoticiaFavoritado: [],
  usuarioAulaCurtido: [],
  usuarioAulaFavoritada: [],

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
  on(actions.loginAutomaticoWhitToken, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.loginAutomaticoWhitTokenSuccess, (state, action) => {
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
  on(actions.loginAutomaticoWhitTokenFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true,
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
    GenericoHelpers.logout();

    return { 
      ...state, 
      usuario: undefined,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false, 
      mensagem: "Conta deslogada com sucesso",
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
    let usuario: UsuarioModel | undefined = undefined;
    if (state.usuario) {
      usuario = {...state.usuario};
      usuario.foto = action.usuarioPerfil.foto ? action.usuarioPerfil.foto : undefined;
      usuario.hobbie = action.usuarioPerfil.hobbie ? action.usuarioPerfil.hobbie : '';
      usuario.dataNascimento = action.usuarioPerfil.dataNascimento ? action.usuarioPerfil.dataNascimento : undefined;
    }

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
    let usuario: UsuarioModel | undefined = undefined;
    if (state.usuario) {
      usuario = new UsuarioModel();
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
      usuario.dataAtualizacao = state.usuario.dataAtualizacao;
      usuario.dataCadastro = state.usuario.dataCadastro;
      usuario.foto = state.usuario.foto;
      usuario.tipoUsuario = state.usuario.tipoUsuario;
      usuario.tipoUsuarioEnum = state.usuario.tipoUsuarioEnum;
      usuario.token = state.usuario.token;
      usuario.topicoForum = state.usuario.topicoForum;
      usuario.usuarioPerfilId = state.usuario.usuarioPerfilId;
      usuario.usuarioAreaInteresses = [...state.usuario.usuarioAreaInteresses];
      
      let usuarioAreaInteresse: AreaInteresseModel = new AreaInteresseModel();
      usuarioAreaInteresse.id = action.usuarioAreaInteresse.areaInteresseId;
      usuarioAreaInteresse.nome = action.usuarioAreaInteresse.areaInteresseNome;

      usuario.usuarioAreaInteresses.push(usuarioAreaInteresse);
    }

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
    let usuario: UsuarioModel | undefined = undefined;
    
    if (state.usuario) {
      usuario = {...state.usuario};
    
      usuario.usuarioAreaInteresses = 
        usuario
          .usuarioAreaInteresses
          .filter(item => item.id != action.usuarioAreaInteresse.areaInteresseId);
    }

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



  
  on(actions.inserirUsuarioNoticiaFavoritado, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.inserirUsuarioNoticiaFavoritadoSuccess, (state, action) => {
    let itens = [...state.usuarioNoticiaFavoritado, action.response];
    
    return { 
        ...state, 
        usuarioNoticiaFavoritado: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.inserirUsuarioNoticiaFavoritadoFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Erro ao buscar as notícias favoritadas do usuário logado"};
  }),

  on(actions.removerUsuarioNoticiaFavoritado, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.removerUsuarioNoticiaFavoritadoSuccess, (state, action) => {
    let itens = [...state.usuarioNoticiaFavoritado].filter(item => item.id != action.response);
    
    return { 
        ...state, 
        usuarioNoticiaFavoritado: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.removerUsuarioNoticiaFavoritadoFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao remover favoritado da notícia"};
  }),

  on(actions.selecionarManyUsuarioNoticiaFavoritado, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyUsuarioNoticiaFavoritadoSuccess, (state, action) => {

    return { 
        ...state, 
        usuarioNoticiaFavoritado: action.response,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyUsuarioNoticiaFavoritadoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar as todas as notícias favoritadas do usuário logado" 
    };
  }),



  on(actions.inserirUsuarioAulaCurtido, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.inserirUsuarioAulaCurtidoSuccess, (state, action) => {
    let itens = [...state.usuarioAulaCurtido, action.response];
    
    return { 
        ...state, 
        usuarioAulaCurtido: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.inserirUsuarioAulaCurtidoFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Erro ao buscar as aulas curtidas do usuário logado"};
  }),

  on(actions.removerUsuarioAulaCurtido, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.removerUsuarioAulaCurtidoSuccess, (state, action) => {
    let itens = [...state.usuarioAulaCurtido].filter(item => item.id != action.response);
    
    return { 
        ...state, 
        usuarioAulaCurtido: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.removerUsuarioAulaCurtidoFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao remover aula curtida"};
  }),

  on(actions.selecionarManyUsuarioAulaCurtido, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyUsuarioAulaCurtidoSuccess, (state, action) => {

    return { 
        ...state, 
        usuarioAulaCurtido: action.response,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyUsuarioAulaCurtidoFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar as todas as aulas curtidas do usuário logado" 
    };
  }),



  on(actions.inserirUsuarioAulaFavoritada, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.inserirUsuarioAulaFavoritadaSuccess, (state, action) => {
    let itens = [...state.usuarioAulaFavoritada, action.response];
    
    return { 
        ...state, 
        usuarioAulaFavoritada: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.inserirUsuarioAulaFavoritadaFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Erro ao inserir a aula favoritada"};
  }),

  on(actions.removerUsuarioAulaFavoritada, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.removerUsuarioAulaFavoritadaSuccess, (state, action) => {
    let itens = [...state.usuarioAulaFavoritada].filter(item => item.id != action.response);
    
    return { 
        ...state, 
        usuarioAulaFavoritada: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.removerUsuarioAulaFavoritadaFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao remover aula favoritada"};
  }),

  on(actions.selecionarManyUsuarioAulaFavoritada, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyUsuarioAulaFavoritadaSuccess, (state, action) => {

    return { 
        ...state, 
        usuarioAulaFavoritada: action.response,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyUsuarioAulaFavoritadaFailure, (state) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha em buscar as aulas favoritadas do usuário logado" 
    };
  }),
);
