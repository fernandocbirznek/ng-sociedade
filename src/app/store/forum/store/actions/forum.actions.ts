import { createAction, props } from '@ngrx/store';

import { 
    ForumModel,
} from 'src/app/models';

export const selecionarManyForum = createAction(
  '[Forum] selecionarManyForum'
);

export const selecionarManyForumSuccess = createAction(
  '[Forum] selecionarManyForum Success',
  props<{ response: ForumModel[] }>()
);

export const selecionarManyForumFailure = createAction(
  '[Forum] selecionarManyAreaFisica Failure',
  props<{ error: any }>()
);
