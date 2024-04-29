import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum-topico.actions';

import { 
    ForumTopicoModel,
} from 'src/app/models';


export const forumTopicoFeatureKey = 'forum-topico';

export interface ForumTopicoState {
    itens: ForumTopicoModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const forumTopicoInitialState: ForumTopicoState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const forumTopicoReducer = createReducer(
  forumTopicoInitialState,

  on(actions.selecionarManyForumTopicoByForumId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyForumTopicoByForumIdSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyForumTopicoByForumIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar os tópicos do fórum"
    };
  }),

  on(actions.inserirForumTopico, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirForumTopicoSuccess, (state, action) => {

   return { 
     ...state, 
     itens: [...state.itens, action.response],
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirForumTopicoFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir o tópico no fórum"
    };
  }),

  on(actions.atualizarForumTopico, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarForumTopicoSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
        if (item.id == action.forumTopico.id) {
            let forumTopico: ForumTopicoModel = new ForumTopicoModel();
            forumTopico.dataCadastro = action.forumTopico.dataCadastro;
            forumTopico.descricao = action.forumTopico.descricao;
            forumTopico.forumId = action.forumTopico.forumId;
            forumTopico.forumTagMany = action.forumTopico.forumTagMany;
            forumTopico.id = action.forumTopico.id;
            forumTopico.titulo = action.forumTopico.titulo;
            forumTopico.usuarioId = action.forumTopico.usuarioId;
            forumTopico.dataAtualizacao = action.response.dataAtualizacao;

            return forumTopico;
        }
        return item;
    })

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.atualizarForumTopicoFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar o tópico do fórum"
    };
  }),

  on(actions.excluirForumTopico, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirForumTopicoSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirForumTopicoFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir o tópico do fórum"
    };
  }),
);