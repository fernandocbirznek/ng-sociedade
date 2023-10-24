import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNoticia from '../reducers/noticia.reducers';

export const selecionarNoticiaState = createFeatureSelector<fromNoticia.NoticiaState>(
  fromNoticia.noticiaFeatureKey
);

export const selecionarManyNoticia = createSelector(selecionarNoticiaState, (state) => {
  return state.itens;
})

export const selecionarOneNoticiaByNoticiaId = (noticiaId: number) => createSelector(selecionarNoticiaState, (state) => {
    return state.itens.find(item => item.id == noticiaId);
})