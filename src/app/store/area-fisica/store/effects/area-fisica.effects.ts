import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/area-fisica.actions';

import { AreaFisicaService } from 'src/app/services';

@Injectable()
export class AreaFisicaEffects {

  constructor(
    private actions$: Actions,
    private areaFisicaService: AreaFisicaService) 
  {}

  selecionarManyAreaFisica$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyAreaFisica),
     concatMap(() =>
       this.areaFisicaService.selecionarAreaFisicaMany().pipe(
         map(response => actions.selecionarManyAreaFisicaSuccess({ response: response })),
         catchError(error => of(actions.selecionarManyAreaFisicaFailure({ error }))))
     )
   );
  });
}
