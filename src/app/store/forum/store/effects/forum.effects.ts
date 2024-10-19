import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum.actions';

import { 
  ForumService 
} from '../../../../services';

@Injectable()
export class ForumEffects {

  constructor(
    private actions$: Actions,
    private forumService: ForumService) 
  {}

  selecionarManyForum$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyForum),
     concatMap(() =>
       this.forumService.selecionarManyForum().pipe(
         map(response => actions.selecionarManyForumSuccess({ response: response })),
         catchError(error => of(actions.selecionarManyForumFailure({ error }))))
     )
   );
  });

  inserirForum$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(actions.inserirForum),
        concatMap((action) =>
            this.forumService.inserirForum(action.forum).pipe(
            map(response => actions.inserirForumSuccess({ response: response })),
            catchError(error => of(actions.inserirForumFailure({ error }))))
        )
    );
  });

  atualizarForum$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(actions.atualizarForum),
        concatMap((action) =>
            this.forumService.atualizarForum(action.forum).pipe(
            map(response => actions.atualizarForumSuccess({ response: response })),
            catchError(error => of(actions.atualizarForumFailure({ error }))))
        )
    );
  });

  excluirForum$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(actions.excluirForum),
          concatMap((action) =>
              this.forumService.excluirForum(action.forumId).pipe(
              map(response => actions.excluirForumSuccess({ response: response })),
              catchError(error => of(actions.excluirForumFailure({ error }))))
          )
      );
  });
}
