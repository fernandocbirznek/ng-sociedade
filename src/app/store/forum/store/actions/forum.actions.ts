import { createAction, props } from '@ngrx/store';

import { 
  ForumModel 
} from '../../../../models';

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

export const inserirForum = createAction(
  '[Forum] inserirForum',
  props<{ forum: ForumModel }>()
);

export const inserirForumSuccess = createAction(
  '[Forum] inserirForum Success',
  props<{ response: ForumModel }>()
);

export const inserirForumFailure = createAction(
  '[Forum] inserirForum Failure',
  props<{ error: any }>()
);

export const atualizarForum = createAction(
  '[Forum] atualizarForum',
  props<{ forum: ForumModel }>()
);

export const atualizarForumSuccess = createAction(
  '[Forum] atualizarForum Success',
  props<{ response: ForumModel }>()
);

export const atualizarForumFailure = createAction(
  '[Forum] atualizarForum Failure',
  props<{ error: any }>()
);

export const excluirForum = createAction(
  '[Forum] excluirForum',
  props<{ forumId: number }>()
);

export const excluirForumSuccess = createAction(
  '[Forum] excluirForum Success',
  props<{ response: number }>()
);

export const excluirForumFailure = createAction(
  '[Forum] excluirForum Failure',
  props<{ error: any }>()
);