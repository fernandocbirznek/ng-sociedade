import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/forum.actions';

import { 
    ForumModel,
} from 'src/app/models';


export const forumFeatureKey = 'forum';

export interface ForumState {
    itens: ForumModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const forumInitialState: ForumState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const forumReducer = createReducer(
  forumInitialState,

  on(actions.selecionarManyForum, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyForumSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyForumFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar os foruns cadastrados no sistema"
    };
  }),
);