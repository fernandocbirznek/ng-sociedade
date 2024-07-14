import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAulaComentario from '../reducers/aula-comentario.reducers';

import { 
  AulaComentarioModel, 
  AulaComentarioViewModel, 
  UsuarioModel
} from 'src/app/models';

import * as manipularContaFeature from '../../../manipular-conta/store';

export const getAulaComentarioState = createFeatureSelector<fromAulaComentario.AulaComentarioState>(
    fromAulaComentario.aulaComentarioFeatureKey
);

export const getAulaComentarioMany = createSelector(
  getAulaComentarioState, (
    state
  ): AulaComentarioViewModel[] => {
  return state.itens;
})

export const getManyAulaComentarioByAulaId = (aulaId: number) => createSelector(
    getAulaComentarioMany, (
    aulaComentarioMany: AulaComentarioModel[]
  ) => {

    return aulaComentarioMany.filter(item => item.aulaId == aulaId);
  }
)

export const getIsUsuarioLogadoAulaComentario = createSelector(
    getAulaComentarioMany,
    manipularContaFeature.getOneUsuarioLogado, (
    aulaComentarioMany: AulaComentarioModel[],
    usuarioLogado: UsuarioModel | undefined
  ): boolean => {

    if (usuarioLogado)
      return aulaComentarioMany.some(item => item.usuarioId == usuarioLogado.id);

    return false;
  }
)