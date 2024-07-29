import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHeader from '../reducers/header.reducers';

import { 
  HeaderRotaModel 
} from 'src/app/models';

export const selecionarHeaderState = createFeatureSelector<fromHeader.HeaderState>(
  fromHeader.headerFeatureKey
);

export const getTituloPagina = createSelector(
    selecionarHeaderState, (
    state
  ) => {

    return state.tituloPagina;
  }
);

export const getAreaFisicaId = createSelector(
  selecionarHeaderState, (
  state
) => {

    return state.areaFisicaId;
  }
);

export const getManyRota = createSelector(
  selecionarHeaderState, (
  state
): HeaderRotaModel[] => {

    return state.rota;
  }
);