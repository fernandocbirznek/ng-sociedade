import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/header.actions';

import { 
  HeaderRotaModel 
} from 'src/app/models';

export const headerFeatureKey = 'header';

export interface HeaderState {
    tituloPagina: string;
    areaFisicaId: number;
    rota: HeaderRotaModel[];
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const headerInitialState: HeaderState = {
    tituloPagina: 'Home',
    areaFisicaId: 2,
    rota: [],
    isSuccess: false,
    isLoading: false,
    isFailure: false,
    error: ""
};

export const headerReducer = createReducer(
  headerInitialState,

  on(actions.alterarTituloPagina, (state, action) => {
    
    return { 
        ...state, 
        tituloPagina: action.titulo,
        areaFisicaId: action.areaFisicaId,
    };
  }),

  on(actions.adicionarRota, (state, action) => {
    let rota = [...state.rota];

    rota[action.rota.rotaNivel] = action.rota;

    return { 
        ...state, 
        rota: rota
    };
  }),

  on(actions.removerRota, (state, action) => {
    let rota = [...state.rota].filter(item => item.rotaNivel < action.rota.rotaNivel);
    
    return { 
        ...state, 
        rota: rota
    };
  }),
);
