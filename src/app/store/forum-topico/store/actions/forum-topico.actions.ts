import { createAction, props } from '@ngrx/store';

import { 
    ForumTopicoModel,
    ForumTopicoViewModel,
} from 'src/app/models';

export const selecionarManyForumTopico = createAction(
  '[ForumTopico] selecionarManyForumTopico'
);

export const selecionarManyForumTopicoSuccess = createAction(
  '[ForumTopico] selecionarManyForumTopico Success',
  props<{ response: ForumTopicoViewModel[] }>()
);

export const selecionarManyForumTopicoFailure = createAction(
  '[ForumTopico] selecionarManyAreaFisicaTopico Failure',
  props<{ error: any }>()
);

export const selecionarManyForumTopicoByForumId = createAction(
  '[ForumTopico] selecionarManyForumTopicoByForumId',
  props<{ forumId: number }>()
);

export const selecionarManyForumTopicoByForumIdSuccess = createAction(
  '[ForumTopico] selecionarManyForumTopicoByForumId Success',
  props<{ response: ForumTopicoViewModel[] }>()
);

export const selecionarManyForumTopicoByForumIdFailure = createAction(
  '[ForumTopico] selecionarManyAreaFisicaTopicoByForumId Failure',
  props<{ error: any }>()
);

export const inserirForumTopico = createAction(
  '[ForumTopico] inserirForumTopico',
  props<{ forumTopico: ForumTopicoViewModel }>()
);

export const inserirForumTopicoSuccess = createAction(
  '[ForumTopico] inserirForumTopico Success',
  props<{ response: ForumTopicoViewModel }>()
);

export const inserirForumTopicoFailure = createAction(
  '[ForumTopico] inserirForumTopico Failure',
  props<{ error: any }>()
);

export const atualizarForumTopico = createAction(
  '[ForumTopico] atualizarForumTopico',
  props<{ forumTopico: ForumTopicoViewModel }>()
);

export const atualizarForumTopicoSuccess = createAction(
  '[ForumTopico] atualizarForumTopico Success',
  props<{ forumTopico: ForumTopicoViewModel, response: ForumTopicoViewModel }>()
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