import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAulaSessao from '../reducers/aula-sessao.reducers';

import * as arquivoPdfFeature from '../../../arquivo-pdf/store';

import { 
  ArquivoPdfModel, 
  AulaSessaoModel
} from '../../../../models';

export const selectAulaSessaoState = createFeatureSelector<fromAulaSessao.AulaSessaoState>(
  fromAulaSessao.aulaSessaoFeatureKey
);

export const getAulaSessaoMany = createSelector(selectAulaSessaoState, (state) => {
  return state.aulaSessao;
})

export const getManyAulaSessaoByAulaId = (aulaId: number) => createSelector(
  selectAulaSessaoState,
  arquivoPdfFeature.getManyArquivoPdfByAulaId(aulaId), (
    state,
    arquivoPdfMany: ArquivoPdfModel[]
  ): AulaSessaoModel[] => {

  return state
    .aulaSessao
    .filter(item => item.aulaId == aulaId)
    .map(item => {
      let aulaSessaoModel: AulaSessaoModel = new AulaSessaoModel();
      aulaSessaoModel.aulaId = item.aulaId;
      aulaSessaoModel.aulaSessaoTipo = item.aulaSessaoTipo;
      aulaSessaoModel.conteudo = item.conteudo;
      aulaSessaoModel.dataAtualizacao = item.dataAtualizacao;
      aulaSessaoModel.dataCadastro = item.dataCadastro;
      aulaSessaoModel.favoritado = item.favoritado;
      aulaSessaoModel.id = item.id;
      aulaSessaoModel.ordem = item.ordem;
      aulaSessaoModel.titulo = item.titulo;

      let arquivoPdf = arquivoPdfMany.find(arquivoPdf => arquivoPdf.id == +item.conteudo);
      if (arquivoPdf)
        aulaSessaoModel.arquivoPdf = arquivoPdf;

      return aulaSessaoModel;
    });
})