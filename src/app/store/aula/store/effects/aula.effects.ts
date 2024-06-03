import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/aula.actions';

import { AulaService } from 'src/app/services';

@Injectable()
export class AulaEffects {

  constructor(
    private actions$: Actions,
    private aulaService: AulaService) 
  {}

  selecionarProfessorAulas$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarAulaByProfessorId),
     concatMap((action) =>
       this.aulaService.selecionarManyAulaByProfessorId(action.professorId).pipe(
         map(response => actions.selecionarAulaByProfessorIdSuccess({ response: response })),
         catchError(error => of(actions.selecionarAulaByProfessorIdFailure({ error }))))
     )
   );
  });

  selecionarManyAula$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarManyAula),
      concatMap((action) =>
        this.aulaService.selecionarManyAula().pipe(
          map(response => actions.selecionarManyAulaSuccess({ response: response })),
          catchError(error => of(actions.selecionarManyAulaFailure({ error }))))
      )
    );
   });

  selecionarOneAulaById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarOneAulaById),
      concatMap((action) =>
        this.aulaService.selecionarOneAulaById(action.aulaId).pipe(
          map(response => actions.selecionarOneAulaByIdSuccess({ aulaId: action.aulaId, response: response })),
          catchError(error => of(actions.selecionarOneAulaByIdFailure({ error }))))
      )
    );
   });

   selecionarManyAulaByAreaFisicaId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarManyAulaByAreaFisicaId),
      concatMap((action) =>
        this.aulaService.selecionarManyAulaByAreaFisicaId(action.areaFisicaId).pipe(
          map(response => actions.selecionarManyAulaByAreaFisicaIdSuccess({ response: response })),
          catchError(error => of(actions.selecionarManyAulaByAreaFisicaIdFailure({ error }))))
      )
    );
   });

  selecionarManyAulaByProfessorId$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.selecionarManyAulaByProfessorId),
    concatMap((action) =>
      this.aulaService.selecionarManyAulaByProfessorId(action.professorId).pipe(
        map(response => actions.selecionarManyAulaByProfessorIdSuccess({ response: response })),
        catchError(error => of(actions.selecionarManyAulaByProfessorIdFailure({ error }))))
    )
  );
  });

  inserirAula$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirAula),
      concatMap((action) =>
        this.aulaService.inserirAula(action.aula).pipe(
          map(response => actions.inserirAulaSuccess({ aula: action.aula, response: response })),
          catchError(error => of(actions.inserirAulaFailure({ error }))))
      )
    );
  });

  atualizarAula$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAula),
      concatMap((action) =>
        this.aulaService.atualizarAula(action.aula).pipe(
          map(response => actions.atualizarAulaSuccess({ aula: action.aula, response: response })),
          catchError(error => of(actions.atualizarAulaFailure({ error }))))
      )
    );
  });

  atualizarAulaCurtir$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaCurtir),
      concatMap((action) =>
        this.aulaService.atualizarAulaCurtir(action.aula).pipe(
          map(response => actions.atualizarAulaCurtirSuccess({ aula: action.aula, response: response })),
          catchError(error => of(actions.atualizarAulaCurtirFailure({ error }))))
      )
    );
  });

  atualizarAulaFavoritada$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaFavoritada),
      concatMap((action) =>
        this.aulaService.atualizarAulaFavoritada(action.aula).pipe(
          map(response => actions.atualizarAulaFavoritadaSuccess({ response: response })),
          catchError(error => of(actions.atualizarAulaFavoritadaFailure({ error }))))
      )
    );
  });

  excluirAula$ = createEffect(() => {
   return this.actions$.pipe( 
     ofType(actions.excluirAula),
     concatMap((action) =>
       this.aulaService.excluirAula(action.aulaId).pipe(
         map(response => actions.excluirAulaSuccess({ aulaId: action.aulaId })),
         catchError(error => of(actions.excluirAulaFailure({ error }))))
     )
   );
  });

  atualizarAulaPublicado$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaPublicado),
      concatMap((action) =>
        this.aulaService.atualizarAulaPublicado(action.aula).pipe(
          map(response => actions.atualizarAulaPublicadoSuccess({ aula: action.aula, response: response })),
          catchError(error => of(actions.atualizarAulaPublicadoFailure({ error }))))
      )
    );
  });



  inserirManyAulaTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirManyAulaTag),
      concatMap((action) =>
        this.aulaService.inserirManyAulaTag(action.aulaTagMany).pipe(
          map(response => actions.inserirManyAulaTagSuccess({ response: response })),
          catchError(error => of(actions.inserirManyAulaTagFailure({ error }))))
      )
    );
  });

  excluirAulaTag$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.excluirAulaTag),
      concatMap((action) =>
        this.aulaService.excluirAulaTag(action.aulaTagId).pipe(
          map(response => actions.excluirAulaTagSuccess({ aulaId: action.aulaId, aulaTagId: action.aulaTagId })),
          catchError(error => of(actions.excluirAulaTagFailure({ error }))))
      )
    );
   });
}
