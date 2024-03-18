import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/manipular-conta.actions';
import { ManipularContaService } from 'src/app/services';
import { Router } from '@angular/router';
import { TipoUsuarioEnum } from 'src/app/models';



@Injectable()
export class ManipularContaEffects {
  snackBar: any;

  constructor(
    private actions$: Actions,
    private manipularContaService: ManipularContaService,
    private router: Router
    ) 
  {}

  criarContaPerfil$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.criarConta),
      concatMap((action) =>
        this.manipularContaService.criarConta(action.conta).pipe(
          map(response => actions.criarContaSuccess({ conta: action.conta, response: response })),
          catchError(error => of(actions.criarContaFailure({ error }))))
      )
    );
  });

  loginConta$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.loginConta),
      concatMap((action) =>
        this.manipularContaService.loginConta(action.login).pipe(
          map(response => {
            switch(response.tipoUsuario) { 
              case TipoUsuarioEnum.UsuarioAdministrador: { 
                //TODO, rota administrador
                break; 
              } 
              case TipoUsuarioEnum.UsuarioComum: { 
                this.router.navigate([`perfil-professor/${response.email}`])
                //this.router.navigate([`perfil/${response.email}`])
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessor: { 
                this.router.navigate([`perfil-professor/${response.email}`])
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
                //TODO, professor administrador; 
              break; 
              } 
              default: { 
                 //TODO, rota home; 
                 break; 
              } 
            }
            return actions.loginContaSuccess({ login: action.login, response: response })
          }),
          catchError(response => {
            return of(actions.loginContaFailure({ response }))
          }))
      )
    );
  });

  deletarConta$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.deletarConta),
      concatMap((action) =>
        this.manipularContaService.deletarConta(action.email).pipe(
          map(response => actions.deletarContaSuccess({ response: response })),
          catchError(response => of(actions.deletarContaFailure({ response }))))
      )
    );
  });

}
