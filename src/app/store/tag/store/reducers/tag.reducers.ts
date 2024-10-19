import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/tag.actions';

import { 
    TagModel,
} from '../../../../models';


export const tagFeatureKey = 'tag';

export interface TagState {
    itens: TagModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const tagInitialState: TagState = {
    itens: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const tagReducer = createReducer(
  tagInitialState,

  on(actions.selecionarManyTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyTagSuccess, (state, action) => {
  
   return { 
     ...state, 
     itens: action.response,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as tags do sistema"
    };
  }),

  on(actions.inserirTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirTagSuccess, (state, action) => {

   return { 
     ...state, 
     itens: [...state.itens, action.response],
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.inserirTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao inserir a tag no sistema"
    };
  }),

  on(actions.excluirTag, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.excluirTagSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.id != action.response);

   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.excluirTagFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir a tag do sistema"
    };
  }),
);