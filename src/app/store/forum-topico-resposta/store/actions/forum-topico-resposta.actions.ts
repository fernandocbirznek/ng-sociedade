import { createAction, props } from '@ngrx/store';

import { 
    ForumTopicoRespostaModel,
} from 'src/app/models';

export const selecionarManyForumTopicoRespostaByForumTopicoId = createAction(
  '[ForumTopicoResposta] selecionarManyForumTopicoRespostaByForumTopicoId',
  props<{ forumTopicoId: number }>()
);

export const selecionarManyForumTopicoRespostaByForumTopicoIdSuccess = createAction(
  '[ForumTopicoResposta] selecionarManyForumTopicoByForumId Success',
  props<{ response: ForumTopicoRespostaModel[] }>()
);

export const selecionarManyForumTopicoRespostaByForumTopicoIdFailure = createAction(
  '[ForumTopicoResposta] selecionarManyForumTopicoRespostaByForumTopicoId Failure',
  props<{ error: any }>()
);

export const inserirForumTopicoResposta = createAction(
  '[ForumTopicoResposta] inserirForumTopicoResposta',
  props<{ forumTopicoResposta: ForumTopicoRespostaModel }>()
);

export const inserirForumTopicoRespostaSuccess = createAction(
  '[ForumTopicoResposta] inserirForumTopicoResposta Success',
  props<{ response: ForumTopicoRespostaModel }>()
);

export const inserirForumTopicoRespostaFailure = createAction(
  '[ForumTopicoResposta] inserirForumTopicoResposta Failure',
  props<{ error: any }>()
);

export const atualizarForumTopicoResposta = createAction(
  '[ForumTopicoResposta] atualizarForumTopicoResposta',
  props<{ forumTopicoResposta: ForumTopicoRespostaModel }>()
);

export const atualizarForumTopicoRespostaSuccess = createAction(
  '[ForumTopicoResposta] atualizarForumTopicoResposta Success',
  props<{ forumTopicoResposta: ForumTopicoRespostaModel, response: ForumTopicoRespostaModel }>()
);

export const atualizarForumTopicoRespostaFailure = createAction(
  '[ForumTopicoResposta] atualizarForumTopicoResposta Failure',
  props<{ error: any }>()
);

export const excluirForumTopicoResposta = createAction(
  '[ForumTopicoResposta] excluirForumTopico',
  props<{ forumTopicoRespostaId: number }>()
);

export const excluirForumTopicoRespostaSuccess = createAction(
  '[ForumTopicoResposta] excluirForumTopicoResposta Success',
  props<{ response: number }>()
);

export const excluirForumTopicoRespostaFailure = createAction(
  '[ForumTopicoResposta] excluirForumTopicoResposta Failure',
  props<{ error: any }>()
);