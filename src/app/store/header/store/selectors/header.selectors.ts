import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHeader from '../reducers/header.reducers';

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
)