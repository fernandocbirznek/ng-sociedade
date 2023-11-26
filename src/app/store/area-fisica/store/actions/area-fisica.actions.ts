import { createAction, props } from '@ngrx/store';

import { 
    AreaFisicaModel,
} from 'src/app/models';

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
