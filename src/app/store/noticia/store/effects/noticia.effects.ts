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

@Injectable()
export class NoticiaEffects {

  constructor(
    public store: Store,
    private actions$: Actions,
    private noticiaService: NoticiaService,
    private areaInteresseService: NoticiaAreaInteresseService
    ) 
  {}

  selecionarNoticiaManyHome$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarNoticiaManyHome),
      concatMap(() =>
        this.noticiaService.selecionarNoticiaManyHome().pipe(
          map(response => {
            return actions.selecionarNoticiaManyHomeSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarNoticiaManyHomeFailure({ error }))))
      )
    );
  });

  selecionarManyNoticia$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarManyNoticia),
      concatMap(() =>
        this.noticiaService.selecionarManyNoticia().pipe(
          map(response => {
            return actions.selecionarManyNoticiaSuccess({ response: response })
          }),
          catchError(error => of(actions.selecionarManyNoticiaFailure({ error }))))
      )
    );
  });

  selecionarNoticiaManyByProfessorId$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(actions.selecionarNoticiaManyByProfessorId),
      concatMap((action) =>
        this.noticiaService.selecionarNoticiaManyProfessor(action.professorId).pipe(
          map(response => actions.selecionarNoticiaManyByProfessorIdSuccess({ response: response })),
          catchError(error => of(actions.selecionarNoticiaManyByProfessorIdFailure({ error }))))
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
