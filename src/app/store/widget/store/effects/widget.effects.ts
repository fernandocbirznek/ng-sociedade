import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions/widget.actions';

import { WidgetService } from '../../../../services';

@Injectable()
export class WidgetEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private widgetService: WidgetService,
    ) 
  {}

  selecionarWidgetCursarByUsuarioId$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarWidgetCursarByUsuarioId),
      concatMap((action) =>
        this.widgetService.selecionarWidgetCursarByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarWidgetCursarByUsuarioIdSuccess({ widgetCursarMany: response })
          }),
          catchError(error => of(actions.selecionarWidgetCursarByUsuarioIdFailure({ error })))
        )
      )
    );
  });

  selecionarWidgetCursandoByUsuarioId$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarWidgetCursandoByUsuarioId),
      concatMap((action) =>
        this.widgetService.selecionarWidgetCursandoByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarWidgetCursandoByUsuarioIdSuccess({ widgetCursandoMany: response })
          }),
          catchError(error => of(actions.selecionarWidgetCursandoByUsuarioIdFailure({ error })))
        )
      )
    );
  });

  selecionarWidgetConcluidoByUsuarioId$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarWidgetConcluidoByUsuarioId),
      concatMap((action) =>
        this.widgetService.selecionarWidgetConcluidoByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarWidgetConcluidoByUsuarioIdSuccess({ widgetConcluidoMany: response })
          }),
          catchError(error => of(actions.selecionarWidgetConcluidoByUsuarioIdFailure({ error })))
        )
      )
    );
  });

  inserirWidgetConcluido$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirWidgetConcluido),
      concatMap((action) =>
        this.widgetService.inserirWidgetConcluido(action.widgetConcluido).pipe(
          map(response => {
            return actions.inserirWidgetConcluidoSuccess({ widgetConcluido: action.widgetConcluido, response: response })
          }),
          catchError(error => of(actions.inserirWidgetConcluidoFailure({ error })))
        )
      )
    );
  });

  inserirWidgetCursando$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirWidgetCursando),
      concatMap((action) =>
        this.widgetService.inserirWidgetCursando(action.widgetCursando).pipe(
          map(response => {
            return actions.inserirWidgetCursandoSuccess({ widgetCursando: action.widgetCursando, response: response })
          }),
          catchError(error => of(actions.inserirWidgetCursandoFailure({ error })))
        )
      )
    );
  });

  inserirWidgetCursar$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirWidgetCursar),
      concatMap((action) =>
        this.widgetService.inserirWidgetCursar(action.widgetCursar).pipe(
          map(response => {
            return actions.inserirWidgetCursarSuccess({ widgetCursar: action.widgetCursar, response: response })
          }),
          catchError(error => of(actions.inserirWidgetCursarFailure({ error })))
        )
      )
    );
  });

  removerWidgetConcluido$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerWidgetConcluido),
      concatMap((action) =>
        this.widgetService.removerWidgetConcluido(action.widgetConcluidoId).pipe(
          map(response => {
            return actions.removerWidgetConcluidoSuccess({ response: response })
          }),
          catchError(error => of(actions.removerWidgetConcluidoFailure({ error })))
        )
      )
    );
  });

  removerWidgetCursando$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerWidgetCursando),
      concatMap((action) =>
        this.widgetService.removerWidgetCursando(action.widgetCursandoId).pipe(
          map(response => {
            return actions.removerWidgetCursandoSuccess({ response: response })
          }),
          catchError(error => of(actions.removerWidgetCursandoFailure({ error })))
        )
      )
    );
  });

  removerWidgetCursar$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerWidgetCursar),
      concatMap((action) =>
        this.widgetService.removerWidgetCursar(action.widgetCursarId).pipe(
          map(response => {
            return actions.removerWidgetCursarSuccess({ response: response })
          }),
          catchError(error => of(actions.removerWidgetCursarFailure({ error })))
        )
      )
    );
  });
}
