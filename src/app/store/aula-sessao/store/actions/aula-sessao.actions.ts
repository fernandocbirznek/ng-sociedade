import { createAction, props } from '@ngrx/store';

import { 
  AulaSessaoModel, 
  AulaSessaoOrdemRequestModel
} from '../../../../models';

export const selecionarOneAulaSessaoById = createAction(
  '[AulaSessao] selecionarOneAulaSessaoById',
  props<{ aulaSessaoId: number }>()
);

export const selecionarOneAulaSessaoByIdSuccess = createAction(
  '[AulaSessao] selecionarOneAulaSessaoById Success',
  props<{ aulaSessaoId: number, response: AulaSessaoModel }>()
);

export const selecionarOneAulaSessaoByIdFailure = createAction(
  '[AulaSessao] selecionarOneAulaSessaoById Failure',
  props<{ error: any }>()
);

export const selecionarManyAulaSessaoByAulaId = createAction(
  '[AulaSessao] selecionarManyAulaSessaoByAulaId',
  props<{ aulaId: number }>()
);

export const selecionarManyAulaSessaoByAulaIdSuccess = createAction(
  '[AulaSessao] selecionarManyAulaSessaoByAulaId Success',
  props<{ aulaId: number, response: AulaSessaoModel[] }>()
);

export const selecionarManyAulaSessaoByAulaIdFailure = createAction(
  '[AulaSessao] selecionarManyAulaSessaoByAulaId Failure',
  props<{ error: any }>()
);

export const inserirAulaSessao = createAction(
  '[AulaSessao] inserirAulaSessao',
  props<{ aulaSessao: AulaSessaoModel }>()
);

export const inserirAulaSessaoSuccess = createAction(
  '[AulaSessao] inserirAulaSessao Success',
  props<{ aulaSessao: AulaSessaoModel, response: AulaSessaoModel }>()
);

export const inserirAulaSessaoFailure = createAction(
  '[AulaSessao] inserirAulaSessao Failure',
  props<{ error: any }>()
);

export const atualizarAulaSessao = createAction(
  '[AulaSessao] atualizarAulaSessao',
  props<{ aulaSessao: AulaSessaoModel }>()
);

export const atualizarAulaSessaoSuccess = createAction(
  '[AulaSessao] atualizarAulaSessao Success',
  props<{ aulaSessao: AulaSessaoModel, response: AulaSessaoModel }>()
);

export const atualizarAulaSessaoFailure = createAction(
  '[AulaSessao] atualizarAulaSessao Failure',
  props<{ error: any }>()
);

export const atualizarAulaSessaoFavoritada = createAction(
  '[AulaSessao] atualizarAulaSessaoFavoritada',
  props<{ aulaSessao: AulaSessaoModel }>()
);

export const atualizarAulaSessaoFavoritadaSuccess = createAction(
  '[AulaSessao] atualizarAulaSessaoFavoritada Success',
  props<{ response: AulaSessaoModel }>()
);

export const atualizarAulaSessaoFavoritadaFailure = createAction(
  '[AulaSessao] atualizarAulaSessaoFavoritada Failure',
  props<{ error: any }>()
);

export const excluirAulaSessao = createAction(
  '[AulaSessao] excluirAulaSessao',
  props<{ aulaSessaoId: number }>()
);

export const excluirAulaSessaoSuccess = createAction(
  '[AulaSessao] excluirAulaSessao Success',
  props<{ aulaSessaoId: number }>()
);

export const excluirAulaSessaoFailure = createAction(
  '[AulaSessao] excluirAulaSessao Failure',
  props<{ error: any }>()
);

export const atualizarAulaSessaoOrdem = createAction(
  '[AulaSessao] atualizarAulaSessaoOrdem',
  props<{ aulaSessaoOrdemRequest: AulaSessaoOrdemRequestModel }>()
);

export const atualizarAulaSessaoOrdemSuccess = createAction(
  '[AulaSessao] atualizarAulaSessaoOrdem Success',
  props<{ 
    aulaSessaoOrdemRequest: AulaSessaoOrdemRequestModel,
    response: Date 
  }>()
);

export const atualizarAulaSessaoOrdemFailure = createAction(
  '[AulaSessao] atualizarAulaSessaoOrdem Failure',
  props<{ error: any }>()
);