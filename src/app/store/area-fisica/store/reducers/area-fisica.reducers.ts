import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/area-fisica.actions';

import { 
  AreaFisicaModel 
} from '../../../../models';

export const areaFisicaFeatureKey = 'area-fisica';

export interface AreaFisicaState {
    areaFisica: AreaFisicaModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const areaFisicaInitialState: AreaFisicaState = {
    areaFisica: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const areaFisicaReducer = createReducer(
  areaFisicaInitialState,

  on(actions.selecionarManyAreaFisica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAreaFisicaSuccess, (state, action) => {
   let areaFisicaMany = [...state.areaFisica];

   action.response.forEach(item => {
    if(!areaFisicaMany.find(areaFisica => areaFisica.id == item.id))
        areaFisicaMany.push(item);
   })
   
  
   return { 
     ...state, 
     areaFisica: areaFisicaMany,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAreaFisicaFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as área da Física"
    };
  }),

  on(actions.inserirAreaFisica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.inserirAreaFisicaSuccess, (state, action) => {
    let item: AreaFisicaModel = action.response;

    let itens = [...state.areaFisica, item];

    return {
      ...state,
      areaFisica: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.inserirAreaFisicaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao cadastrar Area da física." 
    };
  }),

  on(actions.atualizarAreaFisica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.atualizarAreaFisicaSuccess, (state, action) => {
    let itens = [...state.areaFisica].map(item => {
      if(item.id == action.response.id) {
        return action.response;
      }
      return item;
    });

    return {
      ...state,
      areaFisica: itens,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
    };
  }),
  on(actions.atualizarAreaFisicaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao atualizar Area da Física." 
    };
  }),

  on(actions.removerAreaFisica, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.removerAreaFisicaSuccess, (state, action) => {
   let itens = state.areaFisica.filter(item => item.id != action.response);
  
   return { 
     ...state, 
     areaFisica: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.removerAreaFisicaFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao excluir área da Física"
    };
  }),
);