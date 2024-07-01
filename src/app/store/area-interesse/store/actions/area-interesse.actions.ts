import { createAction, props } from '@ngrx/store';

import { 
    AreaInteresseModel,
} from 'src/app/models';

export const selecionarAreaInteresseMany = createAction(
  '[AreaInteresse] selecionarAreaInteresseMany'
);

export const selecionarAreaInteresseManySuccess = createAction(
  '[AreaInteresse] selecionarAreaInteresseMany Success',
  props<{ response: AreaInteresseModel[] }>()
);

export const selecionarAreaInteresseManyFailure = createAction(
  '[AreaInteresse] selecionarAreaInteresseMany Failure',
  props<{ error: any }>()
);

export const inserirAreaInteresse = createAction(
  '[AreaInteresse] inserirAreaInteresse',
  props<{ areaInteresse: AreaInteresseModel }>()
);

export const inserirAreaInteresseSuccess = createAction(
  '[AreaInteresse] inserirAreaInteresse Success',
  props<{ response: AreaInteresseModel }>()
);

export const inserirAreaInteresseFailure = createAction(
  '[AreaInteresse] inserirAreaInteresse Failure',
  props<{ error: any }>()
);

export const excluirAreaInteresse = createAction(
  '[AreaInteresse] excluirAreaInteresse',
  props<{ areaInteresseId: number }>()
);

export const excluirAreaInteresseSuccess = createAction(
  '[AreaInteresse] excluirAreaInteresse Success',
  props<{ response: number }>()
);

export const excluirAreaInteresseFailure = createAction(
  '[AreaInteresse] excluirAreaInteresse Failure',
  props<{ error: any }>()
);