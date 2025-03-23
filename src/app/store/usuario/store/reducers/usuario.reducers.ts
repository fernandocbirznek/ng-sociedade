import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/usuario.actions';

import { 
  TipoUsuarioEnum,
    UsuarioModel
} from '../../../../models';

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
    
    let itens = [...state.itens].map(item => {
      if (item.id == action.response.id)
        return UsuarioModel.create(action.response);
      
      return item;
    });
    
    if (!state.itens.find(item => item.id == action.response.id))
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

  on(actions.selecionarManyUsuario, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
  on(actions.selecionarManyUsuarioSuccess, (state, action) => {
    let itens = [...state.itens];
    
    action.response.forEach(usuario => {
      if(!state.itens.find(item => item.id == usuario.id)) {
        let novoUsuario = UsuarioModel.create(usuario);

        switch(usuario.tipoUsuario) { 
          case TipoUsuarioEnum.UsuarioAdministrador: { 
            novoUsuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioAdministrador;
            break; 
          } 
          case TipoUsuarioEnum.UsuarioProfessor: { 
            novoUsuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioProfessor;
            break; 
          } 
          case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
            novoUsuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioProfessorAdministrador;
            break; 
          } 
          case TipoUsuarioEnum.UsuarioComum: { 
            novoUsuario.tipoUsuarioEnum = TipoUsuarioEnum.UsuarioComum;
            break; 
          } 
          default: { 
            novoUsuario.tipoUsuarioEnum = TipoUsuarioEnum.None;
            break; 
          } 
        }
        itens.push(novoUsuario);
      }
    })

    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false,
        error: ""
    };
  }),
  on(actions.selecionarManyUsuarioFailure, (state) => {

    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        mensagem: "Falha ao buscar os usuários do sistema" 
    };
  }),

  on(actions.criarUsuario, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.criarUsuarioSuccess, (state, action) => {
    let usuario = UsuarioModel.create({
      nome: action.conta.nome,
      email: action.conta.email,
      id: action.response.id,
      tipoUsuario: action.response.tipoUsuario,
      dataCadastro: action.response.dataCadastro
    });

    switch(usuario.tipoUsuario) { 
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

    let itens = [...state.itens];
    itens.push(usuario);

    return { 
      ...state,
      itens: itens,
      isLoading: false, 
      isSuccess: true, 
      isFailure: false,
      mensagem: "Usuário criado com sucesso"
      };
  }),
  on(actions.criarUsuarioFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Falha em criar conta" 
    };
  }),

  on(actions.atualizarUsuario, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.atualizarUsuarioSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
      if (item.id == action.usuario.id) {
        return UsuarioModel.create({
          ...item,
          nome: action.usuario.nome,
          dataAtualizacao: action.response,
          email: action.usuario.email,
          tipoUsuario: action.usuario.tipoUsuarioEnum,
          tipoUsuarioEnum: action.usuario.tipoUsuarioEnum
        });
      }
      return item;
    })
    
    return { 
        ...state, 
        itens: itens,
        isLoading: false, 
        isSuccess: true, 
        isFailure: false, 
        error: ""
    };
  }),
  on(actions.atualizarUsuarioFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao atualizar usuário"};
  }),

  on(actions.excluirUsuario, state => {
    return { 
        ...state, 
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" };
  }),
  on(actions.excluirUsuarioSuccess, (state, action) => {
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
  on(actions.excluirUsuarioFailure, (state, action) => {
    return { 
        ...state, 
        isLoading: false, 
        isSuccess: false, 
        isFailure: true, 
        error: "Falha ao excluir usuário"};
  }),
);
