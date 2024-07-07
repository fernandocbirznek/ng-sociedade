import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromManipularConta from '../reducers/manipular-conta.reducer';

import {
  AdministradorHomeAulaInformacaoModel,
  AdministradorHomeForumInformacaoModel,
  InformacaoAulaAlunoViewModel,
  UsuarioAulaCurtidoModel,
  UsuarioAulaFavoritadaModel,
  UsuarioAulaSessaoFavoritadoModel,
  UsuarioNoticiaFavoritadoModel 
} from 'src/app/models';

import * as usuarioAulaSessaoFavoritadoFeature from '../../../usuario-aula-sessao-favoritado/store';

export const selectManipularContaState = createFeatureSelector<fromManipularConta.ManipularContaState>(
  fromManipularConta.manipularContaFeatureKey
);

export const getOneUsuarioLogado = createSelector(selectManipularContaState, (state) => {
  return state.usuario;
});

export const getManyUsuarioNoticiaFavoritado = createSelector(
  selectManipularContaState, (
    state
  ): UsuarioNoticiaFavoritadoModel[] => {
  return state.usuarioNoticiaFavoritado;
});

export const getOneUsuarioAdministradorHomeAulaInformacao = createSelector(
  selectManipularContaState, (
    state
  ): AdministradorHomeAulaInformacaoModel | undefined => {
  return state.usuarioAdministradorHomeAulaInformacao;
});

export const getOneUsuarioAdministradorHomeForumInformacao = createSelector(
  selectManipularContaState, (
    state
  ): AdministradorHomeForumInformacaoModel | undefined => {
  return state.usuarioAdministradorHomeForumInformacao;
});

export const getOneUsuarioNoticiaFavoritadoByNoticiaId = (noticiaId: number) => createSelector(
  selectManipularContaState, (
    state
  ): UsuarioNoticiaFavoritadoModel | undefined => {

  return state.usuarioNoticiaFavoritado.find(item => item.noticiaId == noticiaId);
});

export const getManyUsuarioAulaCurtido = createSelector(selectManipularContaState, (state) => {
  return state.usuarioAulaCurtido;
});

export const getOneUsuarioAulaCurtidoByNoticiaId = (aulaId: number) => createSelector(
  getManyUsuarioAulaCurtido, (
    itens
  ): UsuarioAulaCurtidoModel | undefined => {

  return itens.find(item => item.aulaId == aulaId);
});

export const getIsUsuarioAulaCurtida = (aulaId: number) => createSelector(
  getManyUsuarioAulaCurtido, (
    usuarioAulaCurtidoMany: UsuarioAulaCurtidoModel[]
  ): UsuarioAulaCurtidoModel | undefined=> {
    let item = usuarioAulaCurtidoMany.find(item => item.aulaId == aulaId);

    if (item)
      return item;

    return undefined;
  }
);

export const getManyUsuarioAulaFavoritada = createSelector(
  selectManipularContaState, (
    state
  ): UsuarioAulaFavoritadaModel[] => {

    return state.usuarioAulaFavoritada;
  }
);

export const getIsUsuarioAulaFavoritada = (aulaId: number) => createSelector(
  getManyUsuarioAulaFavoritada, (
    usuarioAulaFavoritadaMany: UsuarioAulaFavoritadaModel[]
  ): UsuarioAulaFavoritadaModel | undefined=> {
    let item = usuarioAulaFavoritadaMany.find(item => item.aulaId == aulaId);

    if (item)
      return item;

    return undefined;
  }
);

export const getOneInformacaoAulaAluno = createSelector(
  getManyUsuarioAulaCurtido,
  getManyUsuarioAulaFavoritada,
  usuarioAulaSessaoFavoritadoFeature.getManyUsuarioAulaSessaoFavoritadoItens, (
    usuarioAulaCurtidoMany: UsuarioAulaCurtidoModel[],
    usuarioAulaFavoritadaMany: UsuarioAulaFavoritadaModel[],
    usuarioAulaSessaoFavoritadoModel: UsuarioAulaSessaoFavoritadoModel[]
  ): InformacaoAulaAlunoViewModel => {

    let informacaoAulaAluno: InformacaoAulaAlunoViewModel = new InformacaoAulaAlunoViewModel();
    //informacaoAulaAluno.aulaComentario = state.itens;
    informacaoAulaAluno.aulaCurtida = usuarioAulaCurtidoMany.length;
    informacaoAulaAluno.aulaFavoritada = usuarioAulaFavoritadaMany.length;
    informacaoAulaAluno.aulaSessaoFavoritada = usuarioAulaSessaoFavoritadoModel.length;

    return informacaoAulaAluno;
  }
)