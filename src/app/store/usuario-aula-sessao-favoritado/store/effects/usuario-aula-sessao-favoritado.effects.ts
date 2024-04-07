import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions/usuario-aula-sessao-favoritado.actions';

import { 
    UsuarioAulaSessaoFavoritadoService,
} from 'src/app/services';

@Injectable()
export class UsuarioAulaSessaoFavoritadoEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private usuarioAulaSessaoFavoritadoService: UsuarioAulaSessaoFavoritadoService,
    ) 
  {}

  selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId),
      concatMap((action) =>
        this.usuarioAulaSessaoFavoritadoService.selecionarManyAulaSessaoFavoritadoByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioIdFailure({ error }))))
      )
    );
  });

  inserirUsuarioAulaSessaoFavoritado$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirUsuarioAulaSessaoFavoritado),
      concatMap((action) =>
        this.usuarioAulaSessaoFavoritadoService.inserirUsuarioAulaSessaoFavoritado(action.usuarioAulaSessaoFavoritado).pipe(
          map(response => {
            return actions.inserirUsuarioAulaSessaoFavoritadoSuccess({ response: response })
          }),
          catchError(error => of(actions.inserirUsuarioAulaSessaoFavoritadoFailure({ error }))))
      )
    );
  });

  removerUsuarioAulaSessaoFavoritado$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerUsuarioAulaSessaoFavoritado),
      concatMap((action) =>
        this.usuarioAulaSessaoFavoritadoService.removerUsuarioAulaSessaoFavoritado(
          action.aulaSessaoId, action.usuarioId
        ).pipe(
          map(response => {
            return actions.removerUsuarioAulaSessaoFavoritadoSuccess({ response: response })
          }),
          catchError(error => of(actions.removerUsuarioAulaSessaoFavoritadoFailure({ error })))
        )
      )
    );
  });
}
