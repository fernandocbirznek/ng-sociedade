import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum.actions';

import { ForumService } from 'src/app/services';

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
}
