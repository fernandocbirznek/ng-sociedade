import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTag from '../reducers/tag.reducers';

export const getTagState = createFeatureSelector<fromTag.TagState>(
    fromTag.tagFeatureKey
);

export const getManyTag = createSelector(getTagState, (state) => {
  
  return state.itens;
})