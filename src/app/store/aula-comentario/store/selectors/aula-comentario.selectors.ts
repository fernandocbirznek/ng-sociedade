import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAulaComentario from '../reducers/aula-comentario.reducers';

import { 
  AulaComentarioModel 
} from 'src/app/models';

export const getAulaComentarioState = createFeatureSelector<fromAulaComentario.AulaComentarioState>(
    fromAulaComentario.aulaComentarioFeatureKey
);

export const getAulaComentarioMany = createSelector(getAulaComentarioState, (state) => {
  return state.itens;
})

export const getManyAulaComentarioByAulaId = (aulaId: number) => createSelector(
    getAulaComentarioMany, (
    aulaComentarioMany: AulaComentarioModel[]
  ) => {

    return aulaComentarioMany.filter(item => item.aulaId == aulaId);
  }
)