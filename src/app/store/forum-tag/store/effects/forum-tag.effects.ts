import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum-tag.actions';

import { 
    ForumTagService 
} from '../../../../services';

@Injectable()
export class ForumTagEffects {

    constructor(
        private actions$: Actions,
        private forumTagService: ForumTagService
    ) 
    {}

    selecionarManyForumTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.selecionarManyForumTag),
            concatMap(() =>
            this.forumTagService.selecionarManyForumTag().pipe(
                map(response => actions.selecionarManyForumTagSuccess({ response: response })),
                catchError(error => of(actions.selecionarManyForumTagFailure({ error }))))
            )
        );
    });

    inserirForumTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.inserirForumTag),
            concatMap((action) =>
                this.forumTagService.inserirForumTag(action.forumTag).pipe(
                map(response => actions.inserirForumTagSuccess({ response: response })),
                catchError(error => of(actions.inserirForumTagFailure({ error }))))
            )
        );
      });
    
      excluirForumTag$ = createEffect(() => {
          return this.actions$.pipe(
              ofType(actions.excluirForumTag),
              concatMap((action) =>
                  this.forumTagService.excluirForumTag(action.forumTagId).pipe(
                  map(response => actions.excluirForumTagSuccess({ response: response })),
                  catchError(error => of(actions.excluirForumTagFailure({ error }))))
              )
          );
      });
}
