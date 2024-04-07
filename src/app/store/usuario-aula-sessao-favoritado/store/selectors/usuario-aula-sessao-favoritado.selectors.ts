import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuarioAulaSessaoFavoritado from '../reducers/usuario-aula-sessao-favoritado.reducers';

export const getUsuarioAulaSessaoFavoritadoState = createFeatureSelector<
    fromUsuarioAulaSessaoFavoritado.UsuarioAulaSessaoFavoritadoState>(
    fromUsuarioAulaSessaoFavoritado.usuarioAulaSessaoFavoritadoFeatureKey
);

export const getManyUsuarioAulaSessaoFavoritado = createSelector(
    getUsuarioAulaSessaoFavoritadoState, (
    state
  ) => {

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