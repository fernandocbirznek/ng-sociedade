import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum-topico-replica.actions';

import { 
  ForumTopicoReplicaService 
} from '../../../../services';

@Injectable()
export class ForumTopicoReplicaEffects {

  constructor(
    private actions$: Actions,
    private forumTopicoReplicaService: ForumTopicoReplicaService) 
  {}

  selecionarManyForumTopicoReplicaByForumTopicoId$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyForumTopicoReplicaByForumTopicoId),
     concatMap((action) =>
       this.forumTopicoReplicaService.selecionarManyForumTopicoReplicaByForumTopicoId(action.forumTopicoId).pipe(
         map(response => actions.selecionarManyForumTopicoReplicaByForumTopicoIdSuccess({ response: response })),
         catchError(error => of(actions.selecionarManyForumTopicoReplicaByForumTopicoIdFailure({ error }))))
     )
   );
  });

  inserirForumTopicoReplica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirForumTopicoReplica),
      concatMap((action) =>
        this.forumTopicoReplicaService.inserirForumTopicoReplica(action.forumTopicoReplica).pipe(
          map(response => actions.inserirForumTopicoReplicaSuccess({ response: response })),
          catchError(error => of(actions.inserirForumTopicoReplicaFailure({ error }))))
      )
    );
   });

   atualizarForumTopicoReplica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarForumTopicoReplica),
      concatMap((action) =>
        this.forumTopicoReplicaService.atualizarForumTopicoReplica(action.forumTopicoReplica).pipe(
          map(response => actions.atualizarForumTopicoReplicaSuccess({ 
            forumTopicoReplica: action.forumTopicoReplica,
            response: response 
          })),
          catchError(error => of(actions.atualizarForumTopicoReplicaFailure({ error }))))
      )
    );
   });

   excluirForumTopicoReplica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.excluirForumTopicoReplica),
      concatMap((action) =>
        this.forumTopicoReplicaService.excluirForumTopicoReplica(action.forumTopicoReplicaId).pipe(
          map(response => actions.excluirForumTopicoReplicaSuccess({ response: response })),
          catchError(error => of(actions.excluirForumTopicoReplicaFailure({ error }))))
      )
    );
   });
}
