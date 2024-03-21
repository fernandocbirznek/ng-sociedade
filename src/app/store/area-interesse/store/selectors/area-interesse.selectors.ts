import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaInteresse from '../reducers/area-interesse.reducers';

export const selectAreaInteresseState = createFeatureSelector<fromAreaInteresse.AreaInteresseState>(
    fromAreaInteresse.areaInteresseFeatureKey
);

export const getAreaInteresseMany = createSelector(selectAreaInteresseState, (state) => {
  return state.itens;
})