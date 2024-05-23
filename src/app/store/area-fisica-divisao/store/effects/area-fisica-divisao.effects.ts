import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/area-fisica-divisao.actions';

import { AreaFisicaDivisaoService } from 'src/app/services';

@Injectable()
export class AreaFisicaDivisaoEffects {

  constructor(
    private actions$: Actions,
    private areaFisicaDivisaoService: AreaFisicaDivisaoService) 
  {}

  selecionarManyAreaFisicaDivisaoByAreaFisicaId$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyAreaFisicaDivisaoByAreaFisicaId),
     concatMap((action) =>
       this.areaFisicaDivisaoService.selecionarManyAreaFisicaDivisaoByAreaFisicaId(action.areaFisicaId).pipe(
         map(response => actions.selecionarManyAreaFisicaDivisaoByAreaFisicaIdSuccess({ areaFisicaId: action.areaFisicaId, response: response })),
         catchError(error => of(actions.selecionarManyAreaFisicaDivisaoByAreaFisicaIdFailure({ error }))))
     )
   );
  });
}
