import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/manipular-conta.actions';
import { ManipularContaService } from 'src/app/services';



@Injectable()
export class ManipularContaEffects {

  constructor(
    private actions$: Actions,
    private manipularContaService: ManipularContaService) 
  {}

  criarConta$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.criarConta),
      concatMap((action) =>
        this.manipularContaService.criarConta(action.conta).pipe(
          map(response => actions.criarContaSuccess({ conta: action.conta, response: response })),
          catchError(error => of(actions.criarContaFailure({ error }))))
      )
    );
  });

  loginConta$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.loginConta),
      concatMap((action) =>
        this.manipularContaService.loginConta(action.login).pipe(
          map(response => actions.loginContaSuccess({ login: action.login, response: response })),
          catchError(response => of(actions.loginContaFailure({ response }))))
      )
    );
  });

  deletarConta$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.deletarConta),
      concatMap((action) =>
        this.manipularContaService.deletarConta(action.email).pipe(
          map(response => actions.deletarContaSuccess({ response: response })),
          catchError(response => of(actions.deletarContaFailure({ response }))))
      )
    );
  });

}
