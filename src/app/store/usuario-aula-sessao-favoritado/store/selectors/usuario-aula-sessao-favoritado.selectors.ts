import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarioAulaSessaoFavoritado from '../reducers/usuario-aula-sessao-favoritado.reducers';

import { 
  TipoFiltroFavoritadoEnum, 
  TipoSessaoAulaEnum
} from 'src/app/models';

export const getUsuarioAulaSessaoFavoritadoState = createFeatureSelector<
    fromUsuarioAulaSessaoFavoritado.UsuarioAulaSessaoFavoritadoState>(
    fromUsuarioAulaSessaoFavoritado.usuarioAulaSessaoFavoritadoFeatureKey
);

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

    if (tipoSessaoAulaEnum != TipoSessaoAulaEnum.None)
      return state.itens.filter(item => item.aulaSessaoTipo == tipoSessaoAulaEnum);

    return state.itens;
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