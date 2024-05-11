import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/header.actions';

export const headerFeatureKey = 'header';

export interface HeaderState {
    tituloPagina: string;
    isSuccess: boolean;
    isLoading: boolean;
    isFailure: boolean;
    error: string
}

export const headerInitialState: HeaderState = {
    tituloPagina: 'Home',
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
        isLoading: true, 
        isSuccess: false, 
        isFailure: false, 
        error: "" 
    };
  }),
);
