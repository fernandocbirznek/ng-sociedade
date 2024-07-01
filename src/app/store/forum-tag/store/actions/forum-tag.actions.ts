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

export const inserirForumTag = createAction(
  '[ForumTag] inserirForumTag',
  props<{ forumTag: ForumTagModel }>()
);

export const inserirForumTagSuccess = createAction(
  '[ForumTag] inserirForumTag Success',
  props<{ response: ForumTagModel }>()
);

export const inserirForumTagFailure = createAction(
  '[ForumTag] inserirForumTag Failure',
  props<{ error: any }>()
);

export const excluirForumTag = createAction(
  '[ForumTag] excluirForumTag',
  props<{ forumTagId: number }>()
);

export const excluirForumTagSuccess = createAction(
  '[ForumTag] excluirForumTag Success',
  props<{ response: number }>()
);

export const excluirForumTagFailure = createAction(
  '[ForumTag] excluirForumTag Failure',
  props<{ error: any }>()
);