import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromManipularConta from '../reducers/manipular-conta.reducer';

export const selectManipularContaState = createFeatureSelector<fromManipularConta.ManipularContaState>(
  fromManipularConta.manipularContaFeatureKey
);

export const getOneUsuarioLogado = createSelector(selectManipularContaState, (state) => {
  return state.usuario;
})