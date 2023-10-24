import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions/noticia.actions';

import { 
  NoticiaAreaInteresseService, 
  NoticiaService 
} from 'src/app/services';

import { 
  selecionarManyAreaInteresseByNoticiaId 
} from '../actions/noticia.actions';


@Injectable()
export class NoticiaEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private noticiaService: NoticiaService,
    private areaInteresseService: NoticiaAreaInteresseService
    ) 
  {}

  selecionarManyNoticiaHome$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyNoticiaHome),
      concatMap(() =>
        this.noticiaService.selecionarManyNoticia().pipe(
          map(response => {
            response.forEach(item => {
              this.store.dispatch(selecionarManyAreaInteresseByNoticiaId({noticiaId: item.id}));
            })
            return actions.selecionarManyNoticiaHomeSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyNoticiaHomeFailure({ error }))))
      )
    );
  });

  selecionarOneNoticiaById$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarOneNoticiaById),
      concatMap((action) =>
        this.noticiaService.selecionarOneNoticia(action.noticiaId).pipe(
          map(response => actions.selecionarOneNoticiaByIdSuccess({ response: response })),
          catchError(error => of(actions.selecionarOneNoticiaByIdFailure({ error }))))
      )
    );
  });

  inserirNoticia$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.inserirNoticia),
      concatMap((action) =>
        this.noticiaService.inserirNoticia(action.noticia).pipe(
          map(response => actions.inserirNoticiaSuccess({ request: action.noticia, response: response })),
          catchError(error => of(actions.inserirNoticiaFailure({ error }))))
      )
    );
  });

  atualizarNoticia$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.atualizarNoticia),
      concatMap((action) =>
        this.noticiaService.atualizarNoticia(action.noticia).pipe(
          map(response => actions.atualizarNoticiaSuccess({ request: action.noticia, response: response })),
          catchError(error => of(actions.atualizarNoticiaFailure({ error }))))
      )
    );
  });

  excluirNoticia$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.excluirNoticia),
      concatMap((action) =>
        this.noticiaService.excluirNoticia(action.noticiaId).pipe(
          map(response => actions.excluirNoticiaSuccess({ response: response })),
          catchError(error => of(actions.excluirNoticiaFailure({ error }))))
      )
    );
  });

  selecionarManyAreaInteresseByNoticiaId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarManyAreaInteresseByNoticiaId),
      concatMap((action) =>
        this.areaInteresseService.selecionarManyAreaInteresseByNoticiaId(action.noticiaId).pipe(
          map(response => actions.selecionarManyAreaInteresseByNoticiaIdSuccess({ noticiaId: action.noticiaId, response: response })),
          catchError(error => of(actions.selecionarManyAreaInteresseByNoticiaIdFailure({ error }))))
      )
    );
  });
}
