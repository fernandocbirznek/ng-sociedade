import { createAction, props } from '@ngrx/store';

import { 
    ForumTagModel,
} from 'src/app/models';

export const selecionarManyForumTag = createAction(
  '[Forum] selecionarManyForumTag'
);

export const selecionarManyForumTagSuccess = createAction(
  '[Forum] selecionarManyForumTag Success',
  props<{ response: ForumTagModel[] }>()
);

export const selecionarManyForumTagFailure = createAction(
  '[Forum] selecionarManyForumTag Failure',
  props<{ error: any }>()
);
