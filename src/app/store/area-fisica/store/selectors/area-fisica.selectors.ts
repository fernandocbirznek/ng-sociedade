import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaFisica from '../reducers/area-fisica.reducers';

export const selectAreaFisicaState = createFeatureSelector<fromAreaFisica.AreaFisicaState>(
    fromAreaFisica.areaFisicaFeatureKey
);

export const getManyAreaFisica = createSelector(selectAreaFisicaState, (state) => {
  return state.areaFisica;
})