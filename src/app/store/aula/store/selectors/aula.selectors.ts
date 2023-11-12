import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAula from '../reducers/aula.reducers';

export const selectAulaState = createFeatureSelector<fromAula.AulaState>(
  fromAula.aulaFeatureKey
);

export const getAulas = createSelector(selectAulaState, (state) => {
  return state.aulas;
})

export const getManyAulaByProfessorId = (professorId: number) => createSelector(selectAulaState, (state) => {
  return state.aulas.filter(item => item.professorId == professorId);;
})