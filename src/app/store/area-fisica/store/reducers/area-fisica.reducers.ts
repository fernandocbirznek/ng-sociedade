import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/area-fisica.actions';

import { 
    AreaFisicaModel,
} from 'src/app/models';


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
);