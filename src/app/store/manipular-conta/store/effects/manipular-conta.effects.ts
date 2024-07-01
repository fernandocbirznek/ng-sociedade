import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from '../actions/manipular-conta.actions';

import { 
  AulaService,
  ManipularContaService, 
  UsuarioAreaInteresseService, 
  UsuarioAulaCurtidoService, 
  UsuarioAulaFavoritadaService, 
  UsuarioNoticiaFavoritadoService, 
  UsuarioPerfilService 
} from 'src/app/services';

import { 
  TipoUsuarioEnum 
} from 'src/app/models';

import { 
  selecionarManyUsuarioAulaCurtido, 
  selecionarManyUsuarioAulaFavoritada, 
  selecionarManyUsuarioNoticiaFavoritado 
} from '../actions/manipular-conta.actions';

import { 
  atualizarAdicaoNoticiaFavoritado, 
  atualizarRemocaoNoticiaFavoritado 
} from 'src/app/store/noticia';

import { 
  alterarTituloPagina,
  atualizarAdicaoAulaCurtido, 
  atualizarAdicaoAulaFavoritada, 
  atualizarRemocaoAulaCurtido, 
  atualizarRemocaoAulaFavoritada
} from 'src/app/store';

import { GenericoHelpers } from 'src/app/componentes/genericos/helpers/generico.helper';

@Injectable()
export class ManipularContaEffects {
  snackBar: any;

  constructor(
    private actions$: Actions,
    private aulaService: AulaService,
    private manipularContaService: ManipularContaService,
    private usuarioPerfilService: UsuarioPerfilService,
    private usuarioAreaInteresseService: UsuarioAreaInteresseService,
    private usuarioNoticiaFavoritadoService: UsuarioNoticiaFavoritadoService,
    private usuarioAulaCurtidoService: UsuarioAulaCurtidoService,
    private usuarioAulaFavoritadaService: UsuarioAulaFavoritadaService,
    private router: Router,
    public store: Store,
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
                this.router.navigate([`administrador-home/${response.email}/${response.id}`]);
                break; 
              } 
              case TipoUsuarioEnum.UsuarioComum: { 
                this.router.navigate([`aluno-home/${response.email}/${response.id}`]);
                //TODO, colocar num resolver
                this.store.dispatch(selecionarManyUsuarioAulaCurtido({ usuarioId: response.id }));
                this.store.dispatch(selecionarManyUsuarioAulaFavoritada({ usuarioId: response.id }));
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessor: { 
                this.router.navigate([`perfil-professor/${response.email}/${response.id}`]);
                //TODO, colocar num resolver
                this.store.dispatch(selecionarManyUsuarioAulaCurtido({ usuarioId: response.id }));
                this.store.dispatch(selecionarManyUsuarioAulaFavoritada({ usuarioId: response.id }));
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
                //TODO, professor administrador; 
              break; 
              } 
              default: { 
                this.router.navigate(['']);
              } 
            }
            this.store.dispatch(alterarTituloPagina({ titulo: '', areaFisicaId: 0 }));
            this.store.dispatch(selecionarManyUsuarioNoticiaFavoritado({ usuarioId: response.id }));

            GenericoHelpers.saveLocalStorage(response);

            return actions.loginContaSuccess({ login: action.login, response: response })
          }),
          catchError(response => {
            return of(actions.loginContaFailure({ response }))
          }))
      )
    );
  });

  loginAutomaticoWhitToken$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.loginAutomaticoWhitToken),
      concatMap((action) =>
        this.manipularContaService.loginAutomaticoWhitToken(action.token).pipe(
          map(response => {
            switch(response.tipoUsuario) { 
              case TipoUsuarioEnum.UsuarioAdministrador: { 
                this.router.navigate([`administrador-home/${response.email}/${response.id}`]);
                break; 
              } 
              case TipoUsuarioEnum.UsuarioComum: { 
                this.router.navigate([`aluno-home/${response.email}/${response.id}`]);
                //TODO, colocar num resolver
                this.store.dispatch(selecionarManyUsuarioAulaCurtido({ usuarioId: response.id }));
                this.store.dispatch(selecionarManyUsuarioAulaFavoritada({ usuarioId: response.id }));
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessor: { 
                this.router.navigate([`perfil-professor/${response.email}/${response.id}`]);
                break; 
              } 
              case TipoUsuarioEnum.UsuarioProfessorAdministrador: { 
                //TODO, professor administrador; 
              break; 
              } 
              default: { 
                this.router.navigate(['']);
              } 
            }
            this.store.dispatch(alterarTituloPagina({ titulo: '', areaFisicaId: 0 }));
            this.store.dispatch(selecionarManyUsuarioNoticiaFavoritado({ usuarioId: response.id }));

            GenericoHelpers.saveLocalStorage(response);

            return actions.loginAutomaticoWhitTokenSuccess({ response: response })
          }),
          catchError(response => {
            return of(actions.loginAutomaticoWhitTokenFailure())
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



  selecionarManyUsuarioNoticiaFavoritado$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyUsuarioNoticiaFavoritado),
      concatMap((action) =>
        this.usuarioNoticiaFavoritadoService.selecionarManyUsuarioNoticiaFavoritadoByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarManyUsuarioNoticiaFavoritadoSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyUsuarioNoticiaFavoritadoFailure({ error }))))
      )
    );
  });

  inserirUsuarioNoticiaFavoritado$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirUsuarioNoticiaFavoritado),
      concatMap((action) =>
        this.usuarioNoticiaFavoritadoService.inserirUsuarioNoticiaFavoritado(action.usuarioNoticiaFavoritado).pipe(
          map(response => {
            this.store.dispatch(atualizarAdicaoNoticiaFavoritado({ noticiaId: action.usuarioNoticiaFavoritado.noticiaId }));
            return actions.inserirUsuarioNoticiaFavoritadoSuccess({ response: response })
          }),
          catchError(error => of(actions.inserirUsuarioNoticiaFavoritadoFailure({ error }))))
      )
    );
  });

  removerUsuarioNoticiaFavoritado$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerUsuarioNoticiaFavoritado),
      concatMap((action) =>
        this.usuarioNoticiaFavoritadoService.removerUsuarioNoticiaFavoritado(action.usuarioNoticiaFavoritado).pipe(
          map(response => {
            this.store.dispatch(atualizarRemocaoNoticiaFavoritado({ noticiaId: action.usuarioNoticiaFavoritado.noticiaId }));
            return actions.removerUsuarioNoticiaFavoritadoSuccess({ response: response })
          }),
          catchError(error => of(actions.removerUsuarioNoticiaFavoritadoFailure({ error }))))
      )
    );
  });



  selecionarManyUsuarioAulaCurtido$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyUsuarioAulaCurtido),
      concatMap((action) =>
        this.usuarioAulaCurtidoService.selecionarManyAulaCurtidoByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarManyUsuarioAulaCurtidoSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyUsuarioAulaCurtidoFailure({ error }))))
      )
    );
  });

  inserirUsuarioAulaCurtido$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirUsuarioAulaCurtido),
      concatMap((action) =>
        this.usuarioAulaCurtidoService.inserirUsuarioAulaCurtido(action.usuarioAulaCurtido).pipe(
          map(response => {
            this.store.dispatch(atualizarAdicaoAulaCurtido({ aulaId: action.usuarioAulaCurtido.aulaId }));
            return actions.inserirUsuarioAulaCurtidoSuccess({ response: response })
          }),
          catchError(error => of(actions.inserirUsuarioAulaCurtidoFailure({ error }))))
      )
    );
  });

  removerUsuarioAulaCurtido$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerUsuarioAulaCurtido),
      concatMap((action) =>
        this.usuarioAulaCurtidoService.removerUsuarioAulaCurtido(action.usuarioAulaCurtido.id, action.usuarioAulaCurtido.aulaId).pipe(
          map(response => {
            this.store.dispatch(atualizarRemocaoAulaCurtido({ aulaId: action.usuarioAulaCurtido.aulaId }));
            return actions.removerUsuarioAulaCurtidoSuccess({ response: response })
          }),
          catchError(error => of(actions.removerUsuarioAulaCurtidoFailure({ error }))))
      )
    );
  });



  selecionarManyUsuarioAulaFavoritada$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyUsuarioAulaFavoritada),
      concatMap((action) =>
        this.usuarioAulaFavoritadaService.selecionarManyAulaFavoritadaByUsuarioId(action.usuarioId).pipe(
          map(response => {
            return actions.selecionarManyUsuarioAulaFavoritadaSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyUsuarioAulaFavoritadaFailure({ error }))))
      )
    );
  });

  inserirUsuarioAulaFavoritada$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirUsuarioAulaFavoritada),
      concatMap((action) =>
        this.usuarioAulaFavoritadaService.inserirUsuarioAulaFavoritada(action.usuarioAulaFavoritada).pipe(
          map(response => {
            this.store.dispatch(atualizarAdicaoAulaFavoritada({ aulaId: action.usuarioAulaFavoritada.aulaId }));
            return actions.inserirUsuarioAulaFavoritadaSuccess({ response: response })
          }),
          catchError(error => of(actions.inserirUsuarioAulaFavoritadaFailure({ error }))))
      )
    );
  });

  removerUsuarioAulaFavoritada$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.removerUsuarioAulaFavoritada),
      concatMap((action) =>
        this.usuarioAulaFavoritadaService.removerUsuarioAulaFavoritada(action.usuarioAulaFavoritada.id).pipe(
          map(response => {
            this.store.dispatch(atualizarRemocaoAulaFavoritada({ aulaId: action.usuarioAulaFavoritada.aulaId }));
            return actions.removerUsuarioAulaFavoritadaSuccess({ response: response })
          }),
          catchError(error => of(actions.removerUsuarioAulaFavoritadaFailure({ error }))))
      )
    );
  });


  
  selecionarAdministradorHomeAulaInformacao$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarAdministradorHomeAulaInformacao),
      concatMap(() =>
        this.aulaService.selecionarAdministradorHomeAulaInformacao().pipe(
          map(response => actions.selecionarAdministradorHomeAulaInformacaoSuccess({ response: response })),
          catchError(error => of(actions.selecionarAdministradorHomeAulaInformacaoFailure({ error }))))
      )
    );
   });

}
