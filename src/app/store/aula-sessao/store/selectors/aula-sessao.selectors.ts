import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAulaSessao from '../reducers/aula-sessao.reducers';

export const selectAulaSessaoState = createFeatureSelector<fromAulaSessao.AulaSessaoState>(
  fromAulaSessao.aulaSessaoFeatureKey
);

export const getAulaSessaoMany = createSelector(selectAulaSessaoState, (state) => {
  return state.aulaSessao;
})

export const getManyAulaSessaoByAulaId = (aulaId: number) => createSelector(selectAulaSessaoState, (state) => {
  return state.aulaSessao.filter(item => item.aulaId == aulaId);;
})