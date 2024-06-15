import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromArquivoPdf from '../reducers/arquivo-pdf.reducers';
import { ArquivoPdfModel } from 'src/app/models';

export const getArquivoPdfState = createFeatureSelector<fromArquivoPdf.ArquivoPdfState>(
    fromArquivoPdf.arquivoPdfFeatureKey
);

export const getManyArquivoPdf = createSelector(
    getArquivoPdfState, (
    state,
  ): ArquivoPdfModel[] => {

    return state.itens;
  }
)

export const getManyArquivoPdfByAulaId = (aulaId: number) => createSelector(
  getArquivoPdfState, (
  state,
): ArquivoPdfModel[] => {

  return state.itens.filter(item => item.aulaId == aulaId);
}
)
