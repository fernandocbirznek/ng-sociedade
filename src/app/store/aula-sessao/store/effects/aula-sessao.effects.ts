import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/aula-sessao.actions';

import { AulaSessaoService } from 'src/app/services';

@Injectable()
export class AulaSessaoEffects {

  constructor(
    private actions$: Actions,
    private aulaSessaoService: AulaSessaoService) 
  {}

  selecionarOneAulaSessaoById$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarOneAulaSessaoById),
     concatMap((action) =>
       this.aulaSessaoService.selecionarOneAulaSessaoById(action.aulaSessaoId).pipe(
         map(response => actions.selecionarOneAulaSessaoByIdSuccess({ aulaSessaoId: action.aulaSessaoId, response: response })),
         catchError(error => of(actions.selecionarOneAulaSessaoByIdFailure({ error }))))
     )
   );
  });

  selecionarManyAulaSessaoByAulaId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarManyAulaSessaoByAulaId),
      concatMap((action) =>
        this.aulaSessaoService.selecionarManyAulaSessaoByAulaId(action.aulaId).pipe(
          map(response => actions.selecionarManyAulaSessaoByAulaIdSuccess({ aulaId: action.aulaId, response: response })),
          catchError(error => of(actions.selecionarManyAulaSessaoByAulaIdFailure({ error }))))
      )
    );
   });

  inserirAulaSessao$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirAulaSessao),
      concatMap((action) =>
        this.aulaSessaoService.inserirAulaSessao(action.aulaSessao).pipe(
          map(response => actions.inserirAulaSessaoSuccess({ aulaSessao: action.aulaSessao, response: response })),
          catchError(error => of(actions.inserirAulaSessaoFailure({ error }))))
      )
    );
  });

  atualizarAulaSessao$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaSessao),
      concatMap((action) =>
        this.aulaSessaoService.atualizarAulaSessao(action.aulaSessao).pipe(
          map(response => actions.atualizarAulaSessaoSuccess({ aulaSessao: action.aulaSessao, response: response })),
          catchError(error => of(actions.atualizarAulaSessaoFailure({ error }))))
      )
    );
  });

  atualizarAulaSessaoFavoritada$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaSessaoFavoritada),
      concatMap((action) =>
        this.aulaSessaoService.atualizarAulaSessaoFavoritada(action.aulaSessao).pipe(
          map(response => actions.atualizarAulaSessaoFavoritadaSuccess({ response: response })),
          catchError(error => of(actions.atualizarAulaSessaoFavoritadaFailure({ error }))))
      )
    );
  });

  excluirAulaSessao$ = createEffect(() => {
   return this.actions$.pipe( 
     ofType(actions.excluirAulaSessao),
     concatMap((action) =>
       this.aulaSessaoService.excluirAulaSessao(action.aulaSessaoId).pipe(
         map(response => actions.excluirAulaSessaoSuccess({ aulaSessaoId: action.aulaSessaoId })),
         catchError(error => of(actions.excluirAulaSessaoFailure({ error }))))
     )
   );
  });
}
