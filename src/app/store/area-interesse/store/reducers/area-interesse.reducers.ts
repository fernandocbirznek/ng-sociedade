import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/area-interesse.actions';

import { 
  AreaInteresseModel 
} from 'src/app/models';

export const areaInteresseFeatureKey = 'area-interesse';

export interface AreaInteresseState {
  itens: AreaInteresseModel[];
  isSuccess: boolean;
  isLoading: boolean;
  isFailure: boolean;
  mensagem: string;
}

export const areaInteresseInitialState: AreaInteresseState = {
  itens: [],
  isSuccess: false,
  isLoading: false,
  isFailure: false,
  mensagem: "",
};

export const areaInteresseReducer = createReducer(
  areaInteresseInitialState,

  on(actions.selecionarAreaInteresseMany, state => {
    return { 
      ...state, 
      isLoading: true, 
      isSuccess: false, 
      isFailure: false, 
      error: "" 
    };
  }),
  on(actions.selecionarAreaInteresseManySuccess, (state, action) => {
   let itens = state.itens.filter(item => action.response.some(areaInteresse => areaInteresse.id != item.id));

   itens = itens.concat(action.response);
  
   return { 
     ...state, 
     itens: itens,
     isLoading: false, 
     isSuccess: true, 
     isFailure: false, 
   };
  }),
  on(actions.selecionarAreaInteresseManyFailure, (state, action) => {
    return { 
      ...state, 
      isLoading: false, 
      isSuccess: false, 
      isFailure: true, 
      mensagem: "Erro ao buscar as área de interesse"
    };
  }),
);
