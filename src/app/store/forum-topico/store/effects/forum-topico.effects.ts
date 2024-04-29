import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum-topico.actions';

import { ForumTopicoService } from 'src/app/services';

@Injectable()
export class ForumTopicoEffects {

  constructor(
    private actions$: Actions,
    private forumTopicoService: ForumTopicoService) 
  {}

  selecionarManyForumTopico$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyForumTopicoByForumId),
     concatMap((action) =>
       this.forumTopicoService.selecionarManyForumTopicoByForumId(action.forumId).pipe(
         map(response => actions.selecionarManyForumTopicoByForumIdSuccess({ response: response })),
         catchError(error => of(actions.selecionarManyForumTopicoByForumIdFailure({ error }))))
     )
   );
  });

  inserirForumTopico$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirForumTopico),
      concatMap((action) =>
        this.forumTopicoService.inserirForumTopico(action.forumTopico).pipe(
          map(response => actions.inserirForumTopicoSuccess({ response: response })),
          catchError(error => of(actions.inserirForumTopicoFailure({ error }))))
      )
    );
   });

   atualizarForumTopico$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarForumTopico),
      concatMap((action) =>
        this.forumTopicoService.atualizarForumTopico(action.forumTopico).pipe(
          map(response => actions.atualizarForumTopicoSuccess({ forumTopico: action.forumTopico, response: response })),
          catchError(error => of(actions.atualizarForumTopicoFailure({ error }))))
      )
    );
   });

   excluirForumTopico$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.excluirForumTopico),
      concatMap((action) =>
        this.forumTopicoService.excluirForumTopico(action.forumTopicoId).pipe(
          map(response => actions.excluirForumTopicoSuccess({ response: response })),
          catchError(error => of(actions.excluirForumTopicoFailure({ error }))))
      )
    );
   });
}
