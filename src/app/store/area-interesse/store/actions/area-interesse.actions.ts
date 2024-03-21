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
