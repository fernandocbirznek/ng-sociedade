import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum-topico-resposta.actions';

import { 
    ForumTopicoRespostaModel,
} from 'src/app/models';


export const forumTopicoRespostaFeatureKey = 'forum-topico-resposta';

export interface ForumTopicoRespostaState {
    itens: ForumTopicoRespostaModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const forumTopicoRespostaInitialState: ForumTopicoRespostaState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const forumTopicoRespostaReducer = createReducer(
  forumTopicoRespostaInitialState,

  on(actions.selecionarManyForumTopicoRespostaByForumTopicoId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyForumTopicoRespostaByForumTopicoIdSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyForumTopicoRespostaByForumTopicoIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as respostas do fórum tópico"
    };
  }),

  on(actions.inserirForumTopicoResposta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirForumTopicoRespostaSuccess, (state, action) => {

   return { 
     ...state, 
     itens: [...state.itens, action.response],
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirForumTopicoRespostaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir a resposta no fórum tópico"
    };
  }),

  on(actions.atualizarForumTopicoResposta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarForumTopicoRespostaSuccess, (state, action) => {
    let itens = [...state.itens].map(item => {
        if (item.id == action.response.id)
          return action.response;

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
  on(actions.atualizarForumTopicoRespostaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar a resposta no fórum tópico"
    };
  }),

  on(actions.excluirForumTopicoResposta, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirForumTopicoRespostaSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirForumTopicoRespostaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a resposta no fórum tópico"
    };
  }),
);