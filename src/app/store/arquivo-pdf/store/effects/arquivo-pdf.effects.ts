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
            if (action.arquivoPdfCommand.aulaSessao) {
              let aulaSessao: AulaSessaoModel = AulaSessaoModel.create({
                  ...action.arquivoPdfCommand.aulaSessao,
                  conteudo: response.id.toString(),
                  id: response.aulaSessaoId
              });

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
