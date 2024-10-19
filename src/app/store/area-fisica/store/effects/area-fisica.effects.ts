import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/area-fisica.actions';

import { 
  AreaFisicaService 
} from '../../../../services';

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

  inserirAreaFisica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirAreaFisica),
      concatMap((action) =>
        this.areaFisicaService.inserirAreaFisica(action.areaFisica).pipe(
          map(response => actions.inserirAreaFisicaSuccess({ response: response })),
          catchError(error => of(actions.inserirAreaFisicaFailure({ error }))))
      )
    );
   });

   atualizarAreaFisica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAreaFisica),
      concatMap((action) =>
        this.areaFisicaService.atualizarAreaFisica(action.areaFisica).pipe(
          map(response => actions.atualizarAreaFisicaSuccess({ response: response })),
          catchError(error => of(actions.atualizarAreaFisicaFailure({ error }))))
      )
    );
   });

   removerAreaFisica$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.removerAreaFisica),
      concatMap((action) =>
        this.areaFisicaService.removerAreaFisica(action.areaFisicaId).pipe(
          map(response => actions.removerAreaFisicaSuccess({ response: response })),
          catchError(error => of(actions.removerAreaFisicaFailure({ error }))))
      )
    );
   });
}
