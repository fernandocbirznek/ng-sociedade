import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAreaInteresse from '../reducers/area-interesse.reducers';

export const selectAreaInteresseState = createFeatureSelector<fromAreaInteresse.AreaInteresseState>(
    fromAreaInteresse.areaInteresseFeatureKey
);

export const getManyAreaInteresse = createSelector(selectAreaInteresseState, (state) => {
  return state.itens;
})