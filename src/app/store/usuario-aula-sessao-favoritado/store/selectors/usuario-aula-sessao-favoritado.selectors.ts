import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarioAulaSessaoFavoritado from '../reducers/usuario-aula-sessao-favoritado.reducers';

import { 
  ArquivoPdfModel,
  TipoSessaoAulaEnum,
  UsuarioAulaSessaoFavoritadoModel
} from '../../../../models';

export const getUsuarioAulaSessaoFavoritadoState = createFeatureSelector<
    fromUsuarioAulaSessaoFavoritado.UsuarioAulaSessaoFavoritadoState>(
    fromUsuarioAulaSessaoFavoritado.usuarioAulaSessaoFavoritadoFeatureKey
);

export const getManyUsuarioAulaSessaoFavoritadoItens = createSelector(
  getUsuarioAulaSessaoFavoritadoState, (
  state
): UsuarioAulaSessaoFavoritadoModel[] => {

    return state.itens;
  }
)

export const getOneTipoFiltroFavoritadoEnum = createSelector(
  getUsuarioAulaSessaoFavoritadoState, (
  state
): TipoSessaoAulaEnum => {

    return state.tipoSessaoAulaEnum;
  }
)

export const getManyUsuarioAulaSessaoFavoritado = createSelector(
    getUsuarioAulaSessaoFavoritadoState,
    getOneTipoFiltroFavoritadoEnum, (
      state,
      tipoSessaoAulaEnum: TipoSessaoAulaEnum,
  ) => {

    let itens = state
    .itens
    .map(item => {
      let aulaSessaoModel: UsuarioAulaSessaoFavoritadoModel = UsuarioAulaSessaoFavoritadoModel
        .create({
          ...item
        });

      if(item.arquivoConteudo) {
        const byteArray = new Uint8Array(
          atob(item.arquivoConteudo)
            .split("")
            .map(char => char.charCodeAt(0)));
        
        let arquivoPdf: ArquivoPdfModel = ArquivoPdfModel.create({
          conteudo: new Blob([byteArray], { type: 'application/pdf' })
        });

        aulaSessaoModel.arquivoPdf = arquivoPdf;
      }

      return aulaSessaoModel;
    });

    if (tipoSessaoAulaEnum != TipoSessaoAulaEnum.None)
      return itens.filter(item => item.aulaSessaoTipo == tipoSessaoAulaEnum);

    return itens;
  }
)

export const getManySessaoIdInUsuarioAulaSessaoFavoritado = createSelector(
    getUsuarioAulaSessaoFavoritadoState, (
    state
  ) => {
    let usuarioAulaSessaoFavoritadoMany: number[] = [];

    state.itens.forEach(item => {
        usuarioAulaSessaoFavoritadoMany.push(item.aulaSessaoId);
    })

    return usuarioAulaSessaoFavoritadoMany;
  }
)