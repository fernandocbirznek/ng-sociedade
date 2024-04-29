import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum-tag.actions';

import { ForumTagService } from 'src/app/services';

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
}
