import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum-tag.actions';

import { 
    ForumTagModel,
} from 'src/app/models';


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
);