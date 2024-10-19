import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions/usuario.actions';

import { 
  ManipularContaService,
  UsuarioService,
} from '../../../../services';

@Injectable()
export class UsuarioEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private usuarioService: UsuarioService,
    private manipularContaService: ManipularContaService,
    ) 
  {}

  selecionarUsuarioById$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarUsuarioById),
      concatMap((action) =>
        this.usuarioService.selecionarUsuarioById(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarUsuarioByIdSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarUsuarioByIdFailure({ error }))))
      )
    );
  });

  selecionarManyUsuario$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyUsuario),
      concatMap(() =>
        this.usuarioService.selecionarManyUsuario().pipe(
          map(response => {
            return actions.selecionarManyUsuarioSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyUsuarioFailure({ error }))))
      )
    );
  });

  criarUsuario$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.criarUsuario),
      concatMap((action) =>
        this.manipularContaService.criarConta(action.conta).pipe(
          map(response => actions.criarUsuarioSuccess({ conta: action.conta, response: response })),
          catchError(error => of(actions.criarUsuarioFailure({ error }))))
      )
    );
  });

  atualizarUsuario$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.atualizarUsuario),
      concatMap((action) =>
        this.usuarioService.atualizarUsuario(action.usuario).pipe(
          map(response => {
            return actions.atualizarUsuarioSuccess({ usuario: action.usuario, response: response })
          }),
          catchError(error => of(actions.atualizarUsuarioFailure({ error }))))
      )
    );
  });

  excluirUsuario$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.excluirUsuario),
      concatMap((action) =>
        this.usuarioService.excluirUsuario(action.usuarioId).pipe(
          map(response => {
            return actions.excluirUsuarioSuccess({ response: response })
          }),
          catchError(error => of(actions.excluirUsuarioFailure({ error }))))
      )
    );
  });
}
