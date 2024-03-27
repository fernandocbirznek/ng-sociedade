import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions/usuario.actions';

import { 
    UsuarioService 
} from 'src/app/services';

@Injectable()
export class UsuarioEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private usuarioService: UsuarioService,
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
}
