import { createAction, props } from '@ngrx/store';

import { 
  AreaFisicaModel 
} from '../../../../models';

export const selecionarManyAreaFisica = createAction(
  '[AreaFisica] selecionarManyAreaFisica'
);

export const selecionarManyAreaFisicaSuccess = createAction(
  '[AreaFisica] selecionarManyAreaFisica Success',
  props<{ response: AreaFisicaModel[] }>()
);

export const selecionarManyAreaFisicaFailure = createAction(
  '[AreaFisica] selecionarManyAreaFisica Failure',
  props<{ error: any }>()
);

export const inserirAreaFisica = createAction(
  '[AreaFisica] inserirAreaFisica',
  props<{ areaFisica: AreaFisicaModel }>()
);

export const inserirAreaFisicaSuccess = createAction(
  '[AreaFisica] inserirAreaFisica Success',
  props<{ response: AreaFisicaModel }>()
);

export const inserirAreaFisicaFailure = createAction(
  '[AreaFisica] inserirAreaFisica Failure',
  props<{ error: any }>()
);

export const atualizarAreaFisica = createAction(
  '[AreaFisica] atualizarAreaFisica',
  props<{ areaFisica: AreaFisicaModel }>()
);

export const atualizarAreaFisicaSuccess = createAction(
  '[AreaFisica] atualizarAreaFisica Success',
  props<{ response: AreaFisicaModel }>()
);

export const atualizarAreaFisicaFailure = createAction(
  '[AreaFisica] atualizarAreaFisica Failure',
  props<{ error: any }>()
);

export const removerAreaFisica = createAction(
  '[AreaFisica] removerAreaFisica',
  props<{ areaFisicaId: number }>()
);

export const removerAreaFisicaSuccess = createAction(
  '[AreaFisica] removerAreaFisica Success',
  props<{ response: number }>()
);

export const removerAreaFisicaFailure = createAction(
  '[AreaFisica] removerAreaFisica Failure',
  props<{ error: any }>()
);