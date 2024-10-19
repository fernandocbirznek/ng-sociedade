import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions/arquivo-pdf.actions';

import { Store } from '@ngrx/store';

import { 
  AulaSessaoModel 
} from '../../../../models';

import { 
  ArquivoPdfService 
} from '../../../../services';

import { 
  inserirAulaSessaoSuccess 
} from '../../../aula-sessao';

@Injectable()
export class ArquivoPdfEffects {

  constructor(
    private actions$: Actions,
    private arquivoPdfService: ArquivoPdfService,
    public store: Store
  ) 
  {}

  selecionarManyArquivoPdfByAulaId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.selecionarManyArquivoPdfByAulaId),
      concatMap((action) =>
        this.arquivoPdfService.selecionarManyArquivoPdfByAulaId(action.aulaId).pipe(
          map(response => {
            return actions.selecionarManyArquivoPdfByAulaIdSuccess({ response: response })}),
          catchError(error => of(actions.selecionarManyArquivoPdfByAulaIdFailure({ error }))))
      )
    );
  });

  inserirArquivoPdf$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.inserirArquivoPdf),
      concatMap((action) =>
        this.arquivoPdfService.inserirArquivoPdf(action.arquivoPdfCommand).pipe(
          map(response => {
            let aulaSessao: AulaSessaoModel = new AulaSessaoModel();
            if (action.arquivoPdfCommand.aulaSessao) {
              aulaSessao.ordem = action.arquivoPdfCommand.aulaSessao.ordem;
              aulaSessao.titulo = action.arquivoPdfCommand.aulaSessao.titulo;
              aulaSessao.aulaId = action.arquivoPdfCommand.aulaSessao.aulaId;
              aulaSessao.aulaSessaoTipo = action.arquivoPdfCommand.aulaSessao.aulaSessaoTipo;
              aulaSessao.conteudo = response.id.toString();
              aulaSessao.id = response.aulaSessaoId;

              //TODO, corrigir
              this.store.dispatch(inserirAulaSessaoSuccess({ aulaSessao: aulaSessao, response: aulaSessao }));
            }

            return actions.inserirArquivoPdfSuccess({ arquivoPdfCommand: action.arquivoPdfCommand, response: response })
          }),
          catchError(error => of(actions.inserirArquivoPdfFailure({ error }))))
      )
    );
  });
}
