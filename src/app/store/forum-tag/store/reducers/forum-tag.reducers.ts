import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum-tag.actions';

import { 
  ForumTagModel 
} from '../../../../models';

export const forumTagFeatureKey = 'forum-tag';

export interface ForumTagState {
    itens: ForumTagModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const forumTagInitialState: ForumTagState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const forumTagReducer = createReducer(
  forumTagInitialState,

  on(actions.selecionarManyForumTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyForumTagSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyForumTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar os as tags do fórum do sistema."
    };
  }),

  on(actions.inserirForumTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirForumTagSuccess, (state, action) => {

   return { 
     ...state, 
     itens: [...state.itens, action.response],
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirForumTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir a a tag do fórum."
    };
  }),

  on(actions.excluirForumTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirForumTagSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirForumTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a tag do fórum"
    };
  }),
);