import { createAction, props } from '@ngrx/store';

import { 
    ForumTopicoReplicaModel,
} from 'src/app/models';

export const selecionarManyForumTopicoReplicaByForumTopicoId = createAction(
  '[ForumTopicoReplica] selecionarManyForumTopicoReplicaByForumTopicoId',
  props<{ forumTopicoId: number }>()
);

export const selecionarManyForumTopicoReplicaByForumTopicoIdSuccess = createAction(
  '[ForumTopicoReplica] selecionarManyForumTopicoReplicaByForumTopicoId Success',
  props<{ response: ForumTopicoReplicaModel[] }>()
);

export const selecionarManyForumTopicoReplicaByForumTopicoIdFailure = createAction(
  '[ForumTopicoReplica] selecionarManyForumTopicoReplicaByForumTopicoId Failure',
  props<{ error: any }>()
);

export const inserirForumTopicoReplica = createAction(
  '[ForumTopicoReplica] inserirForumTopicoResposta',
  props<{ forumTopicoReplica: ForumTopicoReplicaModel }>()
);

export const inserirForumTopicoReplicaSuccess = createAction(
  '[ForumTopicoReplica] inserirForumTopicoReplica Success',
  props<{ response: ForumTopicoReplicaModel }>()
);

export const inserirForumTopicoReplicaFailure = createAction(
  '[ForumTopicoReplica] inserirForumTopicoReplica Failure',
  props<{ error: any }>()
);

export const atualizarForumTopicoReplica = createAction(
  '[ForumTopicoReplica] atualizarForumTopicoReplica',
  props<{ forumTopicoReplica: ForumTopicoReplicaModel }>()
);

export const atualizarForumTopicoReplicaSuccess = createAction(
  '[ForumTopicoReplica] atualizarForumTopicoReplica Success',
  props<{ forumTopicoReplica: ForumTopicoReplicaModel, response: ForumTopicoReplicaModel }>()
);

export const atualizarForumTopicoReplicaFailure = createAction(
  '[ForumTopicoReplica] atualizarForumTopicoReplica Failure',
  props<{ error: any }>()
);

export const excluirForumTopicoReplica = createAction(
  '[ForumTopicoReplica] excluirForumTopicoReplica',
  props<{ forumTopicoReplicaId: number }>()
);

export const excluirForumTopicoReplicaSuccess = createAction(
  '[ForumTopicoReplica] excluirForumTopicoReplica Success',
  props<{ response: number }>()
);

export const excluirForumTopicoReplicaFailure = createAction(
  '[ForumTopicoReplica] excluirForumTopicoReplica Failure',
  props<{ error: any }>()
);