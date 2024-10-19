import {createReducer, on } from '@ngrx/store';
import * as actions from '../actions/area-fisica-divisao.actions';

import { 
  AreaFisicaDivisaoModel 
} from '../../../../models';

export const areaFisicaDivisaoFeatureKey = 'area-fisica-divisao';

export interface AreaFisicaDivisaoState {
    itens: AreaFisicaDivisaoModel[];

    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    mensagem: string;
}

export const areaFisicaDivisaoInitialState: AreaFisicaDivisaoState = {
    itens: [],

    isSuccess: false,
    isLoading: false,
    isFailure: false,
    mensagem: "",
};

export const areaFisicaDivisaoReducer = createReducer(
  areaFisicaDivisaoInitialState,

  on(actions.selecionarManyAreaFisicaDivisaoByAreaFisicaId, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarManyAreaFisicaDivisaoByAreaFisicaIdSuccess, (state, action) => {
    let itens = [...state.itens].filter(item => item.areaFisicaId != action.areaFisicaId);
        
    action.response.forEach(item => {
        itens.push(item);
    })
   
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarManyAreaFisicaDivisaoByAreaFisicaIdFailure, (state) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as divisões da área da física"
    };
  }),
);