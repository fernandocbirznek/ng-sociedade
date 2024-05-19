import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/tag.actions';

import { TagService } from 'src/app/services';

@Injectable()
export class TagEffects {

  constructor(
        private actions$: Actions,
        private tagService: TagService
    ) 
    {}

    selecionarManyTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.selecionarManyTag),
            concatMap((action) =>
            this.tagService.selecionarManyTag().pipe(
                map(response => actions.selecionarManyTagSuccess({ response: response })),
                catchError(error => of(actions.selecionarManyTagFailure({ error }))))
            )
        );
    });

    inserirTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.inserirTag),
            concatMap((action) =>
                this.tagService.inserirTag(action.tag).pipe(
                map(response => actions.inserirTagSuccess({ response: response })),
                catchError(error => of(actions.inserirTagFailure({ error }))))
            )
        );
    });

    excluirTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.excluirTag),
            concatMap((action) =>
                this.tagService.excluirTag(action.tagId).pipe(
                map(response => actions.excluirTagSuccess({ response: response })),
                catchError(error => of(actions.excluirTagFailure({ error }))))
            )
        );
    });
}
