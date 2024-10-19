import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/aula-comentario.actions';

import { 
  AulaComentarioService 
} from '../../../../services';

@Injectable()
export class AulaComentarioEffects {

  constructor(
    private actions$: Actions,
    private aulaComentarioService: AulaComentarioService) 
  {}

  selecionarManyAulaComentarioByAulaId$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyAulaComentarioByAulaId),
     concatMap((action) =>
       this.aulaComentarioService.selecionarManyAulaComentarioByAulaId(action.aulaId).pipe(
         map(response => actions.selecionarManyAulaComentarioByAulaIdSuccess({ response: response })),
         catchError(error => of(actions.selecionarManyAulaComentarioByAulaIdFailure({ error }))))
     )
   );
  });

  inserirAulaComentario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirAulaComentario),
      concatMap((action) =>
        this.aulaComentarioService.inserirAulaComentario(action.aulaComentario).pipe(
          map(response => actions.inserirAulaComentarioSuccess({ aulaComentario: action.aulaComentario, response: response })),
          catchError(error => of(actions.inserirAulaComentarioFailure({ error }))))
      )
    );
  });

  atualizarAulaComentario$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarAulaComentario),
      concatMap((action) =>
        this.aulaComentarioService.atualizarAulaComentario(action.aulaComentario).pipe(
          map(response => actions.atualizarAulaComentarioSuccess({ aulaComentario: action.aulaComentario, response: response })),
          catchError(error => of(actions.atualizarAulaComentarioFailure({ error }))))
      )
    );
  });

  excluirAulaComentario$ = createEffect(() => {
   return this.actions$.pipe( 
     ofType(actions.excluirAulaComentario),
     concatMap((action) =>
       this.aulaComentarioService.excluirAulaComentario(action.aulaComentarioId).pipe(
         map(response => actions.excluirAulaComentarioSuccess({ response: response })),
         catchError(error => of(actions.excluirAulaComentarioFailure({ error }))))
     )
   );
  });
}
