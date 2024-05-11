import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromManipularConta from '../reducers/manipular-conta.reducer';

import {
  UsuarioNoticiaFavoritadoModel 
} from 'src/app/models';

export const selectManipularContaState = createFeatureSelector<fromManipularConta.ManipularContaState>(
  fromManipularConta.manipularContaFeatureKey
);

export const getOneUsuarioLogado = createSelector(selectManipularContaState, (state) => {
  return state.usuario;
})

export const getManyUsuarioNoticiaFavoritado = createSelector(selectManipularContaState, (state) => {
  return state.usuarioNoticiaFavoritado;
})

export const getOneUsuarioNoticiaFavoritadoByNoticiaId = (noticiaId: number) => createSelector(
  selectManipularContaState, (
    state
  ): UsuarioNoticiaFavoritadoModel | undefined => {

  return state.usuarioNoticiaFavoritado.find(item => item.noticiaId == noticiaId);
})