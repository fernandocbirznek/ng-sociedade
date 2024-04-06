import { createAction, props } from '@ngrx/store';

import { 
  AulaComentarioModel 
} from 'src/app/models';

export const selecionarManyAulaComentarioByAulaId = createAction(
  '[AulaComentario] selecionarManyAulaComentarioByAulaId',
  props<{ aulaId: number }>()
);

export const selecionarManyAulaComentarioByAulaIdSuccess = createAction(
  '[AulaComentario] selecionarManyAulaComentarioByAulaId Success',
  props<{ response: AulaComentarioModel[] }>()
);

export const selecionarManyAulaComentarioByAulaIdFailure = createAction(
  '[AulaComentario] selecionarManyAulaComentarioByAulaId Failure',
  props<{ error: any }>()
);

export const inserirAulaComentario = createAction(
  '[AulaComentario] inserirAulaComentario',
  props<{ aulaComentario: AulaComentarioModel }>()
);

export const inserirAulaComentarioSuccess = createAction(
  '[AulaComentario] inserirAulaComentario Success',
  props<{ aulaComentario: AulaComentarioModel, response: AulaComentarioModel }>()
);

export const inserirAulaComentarioFailure = createAction(
  '[AulaComentario] inserirAulaComentario Failure',
  props<{ error: any }>()
);

export const atualizarAulaComentario = createAction(
  '[AulaComentario] atualizarAulaComentario',
  props<{ aulaComentario: AulaComentarioModel }>()
);

export const atualizarAulaComentarioSuccess = createAction(
  '[AulaComentario] atualizarAulaComentario Success',
  props<{ aulaComentario: AulaComentarioModel, response: AulaComentarioModel }>()
);

export const atualizarAulaComentarioFailure = createAction(
  '[AulaComentario] atualizarAulaComentario Failure',
  props<{ error: any }>()
);

export const excluirAulaComentario = createAction(
  '[AulaComentario] excluirAulaComentario',
  props<{ aulaComentarioId: number }>()
);

export const excluirAulaComentarioSuccess = createAction(
  '[AulaComentario] excluirAulaComentario Success',
  props<{ response: number }>()
);

export const excluirAulaComentarioFailure = createAction(
  '[AulaComentario] excluirAulaComentario Failure',
  props<{ error: any }>()
);
