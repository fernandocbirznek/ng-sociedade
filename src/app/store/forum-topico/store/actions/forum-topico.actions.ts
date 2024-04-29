import { createAction, props } from '@ngrx/store';

import { 
    ForumTopicoModel,
} from 'src/app/models';

export const selecionarManyForumTopicoByForumId = createAction(
  '[ForumTopico] selecionarManyForumTopicoByForumId',
  props<{ forumId: number }>()
);

export const selecionarManyForumTopicoByForumIdSuccess = createAction(
  '[ForumTopico] selecionarManyForumTopicoByForumId Success',
  props<{ response: ForumTopicoModel[] }>()
);

export const selecionarManyForumTopicoByForumIdFailure = createAction(
  '[ForumTopico] selecionarManyAreaFisicaTopicoByForumId Failure',
  props<{ error: any }>()
);

export const inserirForumTopico = createAction(
  '[ForumTopico] inserirForumTopico',
  props<{ forumTopico: ForumTopicoModel }>()
);

export const inserirForumTopicoSuccess = createAction(
  '[ForumTopico] inserirForumTopico Success',
  props<{ response: ForumTopicoModel }>()
);

export const inserirForumTopicoFailure = createAction(
  '[ForumTopico] inserirForumTopico Failure',
  props<{ error: any }>()
);

export const atualizarForumTopico = createAction(
  '[ForumTopico] atualizarForumTopico',
  props<{ forumTopico: ForumTopicoModel }>()
);

export const atualizarForumTopicoSuccess = createAction(
  '[ForumTopico] atualizarForumTopico Success',
  props<{ forumTopico: ForumTopicoModel, response: ForumTopicoModel }>()
);

export const atualizarForumTopicoFailure = createAction(
  '[ForumTopico] atualizarForumTopico Failure',
  props<{ error: any }>()
);

export const excluirForumTopico = createAction(
  '[ForumTopico] excluirForumTopico',
  props<{ forumTopicoId: number }>()
);

export const excluirForumTopicoSuccess = createAction(
  '[ForumTopico] excluirForumTopico Success',
  props<{ response: number }>()
);

export const excluirForumTopicoFailure = createAction(
  '[ForumTopico] excluirForumTopico Failure',
  props<{ error: any }>()
);