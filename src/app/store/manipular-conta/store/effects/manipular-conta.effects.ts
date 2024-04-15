import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import * as actions from '../actions/manipular-conta.actions';

import { 
  ManipularContaService, 
  UsuarioAreaInteresseService, 
  UsuarioPerfilService 
} from 'src/app/services';

import { 
  TipoUsuarioEnum 
} from 'src/app/models';


@Injectable()
export class ManipularContaEffects {
  snackBar: any;

  constructor(
    private actions$: Actions,
    private manipularContaService: ManipularContaService,
    private usuarioPerfilService: UsuarioPerfilService,
    private usuarioAreaInteresseService: UsuarioAreaInteresseService,
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
                this.router.navigate([`administrador-home/${response.email}`])
                break; 
              } 
              case TipoUsuarioEnum.UsuarioComum: { 
                this.router.navigate([`aluno-home/${response.email}`])
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

  atualizarUsuarioPerfil$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.atualizarUsuarioPerfil),
      concatMap((action) =>
        this.usuarioPerfilService.atualizarUsuarioPerfil(action.usuarioPerfil).pipe(
          map(response => {
            return actions.atualizarUsuarioPerfilSuccess({ usuarioPerfil: action.usuarioPerfil, response: response })
          }),
          catchError(error => of(actions.atualizarUsuarioPerfilFailure({ error }))))
      )
    );
  });

  inserirUsuarioAreaInteresse$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirUsuarioAreaInteresse),
      concatMap((action) =>
        this.usuarioAreaInteresseService.inserirUsuarioAreaInteresse(action.usuarioAreaInteresse).pipe(
          map(response => {
            return actions.inserirUsuarioAreaInteresseSuccess({ 
              usuarioAreaInteresse: action.usuarioAreaInteresse, 
              response: response 
            })
          }),
          catchError(error => of(actions.inserirUsuarioAreaInteresseFailure({ error }))))
      )
    );
  });

  removerUsuarioAreaInteresse$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerUsuarioAreaInteresse),
      concatMap((action) =>
        this.usuarioAreaInteresseService.removerUsuarioAreaInteresse(action.usuarioAreaInteresse).pipe(
          map(response => {
            return actions.removerUsuarioAreaInteresseSuccess({ 
              usuarioAreaInteresse: action.usuarioAreaInteresse, 
              response: response 
            })
          }),
          catchError(error => of(actions.removerUsuarioAreaInteresseFailure({ error }))))
      )
    );
  });

}
