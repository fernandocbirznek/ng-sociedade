import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/area-interesse.actions';

import { AreaInteresseService } from 'src/app/services';

@Injectable()
export class AreaInteresseEffects {

  constructor(
    private actions$: Actions,
    private areaInteresseService: AreaInteresseService) 
  {}

  selecionarAreaInteresseMany$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarAreaInteresseMany),
     concatMap(() =>
       this.areaInteresseService.selecionarAreaInteresseMany().pipe(
         map(response => actions.selecionarAreaInteresseManySuccess({ response: response })),
         catchError(error => of(actions.selecionarAreaInteresseManyFailure({ error }))))
     )
   );
  });

  inserirAreaInteresse$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(actions.inserirAreaInteresse),
        concatMap((action) =>
            this.areaInteresseService.inserirAreaInteresse(action.areaInteresse).pipe(
            map(response => actions.inserirAreaInteresseSuccess({ response: response })),
            catchError(error => of(actions.inserirAreaInteresseFailure({ error }))))
        )
    );
  });

  excluirAreaInteresse$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(actions.excluirAreaInteresse),
          concatMap((action) =>
              this.areaInteresseService.excluirAreaInteresse(action.areaInteresseId).pipe(
              map(response => actions.excluirAreaInteresseSuccess({ response: response })),
              catchError(error => of(actions.excluirAreaInteresseFailure({ error }))))
          )
      );
  });
}