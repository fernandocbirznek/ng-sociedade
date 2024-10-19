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
      if (item.id == action.response.id) {
        let novoUsuario = new UsuarioModel();
        novoUsuario.id = action.response.id;
        novoUsuario.nome = action.response.nome;
        novoUsuario.comentarioAula = action.response.comentarioAula;
        novoUsuario.comentarioForum = action.response.comentarioForum;
        novoUsuario.curtirAula = action.response.curtirAula;
        novoUsuario.dataNascimento = action.response.dataNascimento;
        novoUsuario.dataCadastro = action.response.dataCadastro;
        novoUsuario.email = action.response.email;
        novoUsuario.hobbie = action.response.hobbie;
        novoUsuario.noticiaVisualizada = action.response.noticiaVisualizada;
        novoUsuario.usuarioAreaInteresses = action.response.usuarioAreaInteresses;
        novoUsuario.sociedadeId = action.response.sociedadeId;
        novoUsuario.tipoUsuario = action.response.tipoUsuario;

        return novoUsuario;
      }
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
        let novoUsuario = new UsuarioModel();
        novoUsuario.id = usuario.id;
        novoUsuario.nome = usuario.nome;
        novoUsuario.comentarioAula = usuario.comentarioAula;
        novoUsuario.comentarioForum = usuario.comentarioForum;
        novoUsuario.curtirAula = usuario.curtirAula;
        novoUsuario.dataNascimento = usuario.dataNascimento;
        novoUsuario.dataCadastro = usuario.dataCadastro;
        novoUsuario.email = usuario.email;
        novoUsuario.hobbie = usuario.hobbie;
        novoUsuario.noticiaVisualizada = usuario.noticiaVisualizada;
        novoUsuario.usuarioAreaInteresses = usuario.usuarioAreaInteresses;
        novoUsuario.sociedadeId = usuario.sociedadeId;
        novoUsuario.tipoUsuario = usuario.tipoUsuario;

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
    let usuario = new UsuarioModel();
    usuario.nome = action.conta.nome;
    usuario.email = action.conta.email;
    usuario.id = action.response.id;
    usuario.tipoUsuario = action.response.tipoUsuario;
    usuario.dataCadastro = action.response.dataCadastro;

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
        let usuario: UsuarioModel = new UsuarioModel();
        usuario.id = usuario.id;
        usuario.nome = action.usuario.nome;
        usuario.comentarioAula = usuario.comentarioAula;
        usuario.comentarioForum = usuario.comentarioForum;
        usuario.curtirAula = usuario.curtirAula;
        usuario.dataNascimento = usuario.dataNascimento;
        usuario.dataCadastro = usuario.dataCadastro;
        usuario.dataAtualizacao = action.response;
        usuario.email = action.usuario.email;
        usuario.hobbie = usuario.hobbie;
        usuario.noticiaVisualizada = usuario.noticiaVisualizada;
        usuario.usuarioAreaInteresses = usuario.usuarioAreaInteresses;
        usuario.sociedadeId = usuario.sociedadeId;
        usuario.tipoUsuario = action.usuario.tipoUsuarioEnum;
        usuario.tipoUsuarioEnum = action.usuario.tipoUsuarioEnum;

        return usuario;
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
