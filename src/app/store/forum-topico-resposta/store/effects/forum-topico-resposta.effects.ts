import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/forum-topico-resposta.actions';

import { 
  ForumTopicoRespostaService 
} from '../../../../services';

@Injectable()
export class ForumTopicoRespostaEffects {

  constructor(
    private actions$: Actions,
    private forumTopicoRespostaService: ForumTopicoRespostaService) 
  {}

  selecionarManyForumTopicoResposta$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(actions.selecionarManyForumTopicoRespostaByForumTopicoId),
     concatMap((action) =>
       this.forumTopicoRespostaService.selecionarManyForumTopicoRespostaByForumTopicoId(action.forumTopicoId).pipe(
         map(response => { console.log("response = ", response);
          return actions.selecionarManyForumTopicoRespostaByForumTopicoIdSuccess({ response: response })}),
         catchError(error => of(actions.selecionarManyForumTopicoRespostaByForumTopicoIdFailure({ error }))))
     )
   );
  });

  inserirForumTopicoResposta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirForumTopicoResposta),
      concatMap((action) =>
        this.forumTopicoRespostaService.inserirForumTopicoResposta(action.forumTopicoResposta).pipe(
          map(response => actions.inserirForumTopicoRespostaSuccess({ response: response })),
          catchError(error => of(actions.inserirForumTopicoRespostaFailure({ error }))))
      )
    );
   });

   atualizarForumTopicoResposta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.atualizarForumTopicoResposta),
      concatMap((action) =>
        this.forumTopicoRespostaService.atualizarForumTopicoResposta(action.forumTopicoResposta).pipe(
          map(response => actions.atualizarForumTopicoRespostaSuccess({ 
            forumTopicoResposta: action.forumTopicoResposta,
            response: response 
          })),
          catchError(error => of(actions.atualizarForumTopicoRespostaFailure({ error }))))
      )
    );
   });

   excluirForumTopicoResposta$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.excluirForumTopicoResposta),
      concatMap((action) =>
        this.forumTopicoRespostaService.excluirForumTopico(action.forumTopicoRespostaId).pipe(
          map(response => actions.excluirForumTopicoRespostaSuccess({ response: response })),
          catchError(error => of(actions.excluirForumTopicoRespostaFailure({ error }))))
      )
    );
   });
}
