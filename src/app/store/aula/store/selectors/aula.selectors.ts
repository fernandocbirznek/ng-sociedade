import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAula from '../reducers/aula.reducers';

import { 
  AreaFisicaModel,
  ArquivoPdfModel,
  AulaComentarioModel,
  AulaFilterModel,
  AulaSessaoModel, 
  AulaViewModel, 
  InformacaoAulaViewModel, 
  TagModel,
  TipoOrdenarAulaFiltroEnum,
  TipoSessaoAulaEnum,
  UsuarioAulaCurtidoModel,
  UsuarioAulaFavoritadaModel
} from 'src/app/models';

import * as areaFisicaFeature from '../../../area-fisica/store';
import * as arquivoPdfFeature from '../../../arquivo-pdf/store';
import * as aulaComentarioFeature from '../../../aula-comentario/store';
import * as headerFeature from '../../../header/store';
import * as manipularContaFeature from '../../../manipular-conta/store';
import * as tagFeature from '../../../tag/store';

import moment from 'moment';
import { TopicoHelpers } from 'src/app/componentes/topicos/helpers/topicos-helpers';

export const selectAulaState = createFeatureSelector<fromAula.AulaState>(
  fromAula.aulaFeatureKey
);

export const getOneAulaFilter = createSelector(
  selectAulaState, (
    state,
  ): AulaFilterModel => {

    return state.aulaFilter;
  }
)

export const getOneAulaSelected = createSelector(
  selectAulaState, (
    state,
  ): number => {

    return state.aulaSelected;
  }
)

export const getManyAula = createSelector(
  selectAulaState, 
  areaFisicaFeature.getManyAreaFisica,
  manipularContaFeature.getManyUsuarioAulaCurtido,
  manipularContaFeature.getManyUsuarioAulaFavoritada,
  tagFeature.getManyTag, (
    state,
    areaFisicaMany: AreaFisicaModel[],
    usuarioAulaCurtidoMany: UsuarioAulaCurtidoModel[],
    usuarioAulaFavoritadaMany: UsuarioAulaFavoritadaModel[],
    tagMany: TagModel[]
  ): AulaViewModel[] => {

    let itens: AulaViewModel[] = 
    state
      .aulas
      .map(item => {
        let areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == item.areaFisicaId);
        let tags: TagModel[] = [];

        let aulaViewModel: AulaViewModel = new AulaViewModel;
        aulaViewModel.areaFisicaId = item.areaFisicaId;
        aulaViewModel.curtido = item.curtido;
        aulaViewModel.favoritado = item.favoritado;
        aulaViewModel.id = item.id;
        aulaViewModel.professorId = item.professorId;
        aulaViewModel.resumo = item.resumo;
        aulaViewModel.titulo = item.titulo;
        aulaViewModel.aulaComentarioMany = item.aulaComentarioMany;
        aulaViewModel.aulaSessaoMany = item.aulaSessaoMany;
        aulaViewModel.aulaTagMany = item.aulaTagMany;
        aulaViewModel.comentario = item.comentario;
        aulaViewModel.dataCadastro = item.dataCadastro;
        aulaViewModel.dataAtualizacao = item.dataAtualizacao;
        aulaViewModel.professorNome = item.professorNome;
        aulaViewModel.publicado = item.publicado;
        aulaViewModel.aulaAnteriorId = item.aulaAnteriorId;
        aulaViewModel.aulaPosteriorId = item.aulaPosteriorId;

        if (areaFisica)
          aulaViewModel.areaFisicaTitulo = areaFisica.titulo;

        if (item.aulaTagMany && item.aulaTagMany.length > 0) {
          item.aulaTagMany.forEach(aulaTag => {
            let tag = tagMany.find(tag => tag.id == aulaTag.tagId);
            if (tag)
              tags.push(tag);
          });
        }

        let usuarioAulaCurtido = usuarioAulaCurtidoMany.find(usuarioAulaCurtido => usuarioAulaCurtido.aulaId == item.id);
        let usuarioAulaFavoritada = usuarioAulaFavoritadaMany.find(usuarioAulaFavoritada => usuarioAulaFavoritada.aulaId == item.id);

        aulaViewModel.tagMany = tags;
        aulaViewModel.comentario = item.aulaComentarioMany.length;
        aulaViewModel.usuarioLogadoCurtiu = usuarioAulaCurtido ? true : false;
        aulaViewModel.usuarioLogadoFavoritada = usuarioAulaFavoritada ? true : false;
        return aulaViewModel;
      });

    return itens;
  }
)

export const getManyAulaByFilter = createSelector(
  getOneAulaFilter,
  getManyAula, (
    aulaFilter: AulaFilterModel,
    aulaMany: AulaViewModel[],
  ): AulaViewModel[] => {

    let itens = aulaMany;

    if (aulaFilter && aulaFilter.nomeProfessor)
      itens = itens.filter(item => item.professorNome.toLocaleLowerCase().includes(aulaFilter.nomeProfessor!.toLocaleLowerCase()));

    if (aulaFilter && aulaFilter.aulaTitulo)
      itens = itens.filter(item => item.titulo.toLocaleLowerCase().includes(aulaFilter.aulaTitulo!.toLocaleLowerCase()));

    if (aulaFilter && aulaFilter.dataInicio)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') >= moment(aulaFilter.dataInicio!).startOf('day'));

    if (aulaFilter && aulaFilter.dataFim)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') <= moment(aulaFilter.dataFim!).startOf('day'));

    if (aulaFilter && aulaFilter.tagMany.length > 0) {
      itens = itens.filter(item => item
        .tagMany
        .some(tagFilter => aulaFilter.tagMany.some(tag => tag.id == tagFilter.id))
      )
    } 

    if (aulaFilter && aulaFilter.tipoOrdenarAulaFiltroEnum != TipoOrdenarAulaFiltroEnum.None)
      itens = TopicoHelpers.ordernarByTipoAulaFiltroEnum(itens, aulaFilter.tipoOrdenarAulaFiltroEnum);

    return itens.filter(item => item.publicado);
  }
)

export const getManyAulaByProfessorId = (professorId: number) => createSelector(
  getManyAula, (
    aulaMany: AulaViewModel[],
  ) => {

    return aulaMany
      .filter(item => item.professorId == professorId);
  }
)

export const getManyAulaForEditarAulaSelectByAreaFisicaId = (professorId: number, areaFisicaId: number) => createSelector(
  getManyAulaByProfessorId(professorId), (
    aulaMany: AulaViewModel[],
  ) => {

    return aulaMany
      .filter(item => item.areaFisicaId == areaFisicaId);
  }
)

export const getManyAulaByAreaFisicaId = createSelector(
  getManyAulaByFilter,
  headerFeature.getAreaFisicaId, (
    aulaMany: AulaViewModel[],
    areaFisicaId: number
  ): AulaViewModel[] => {

  let itens = aulaMany.filter(item => item.areaFisicaId == areaFisicaId);

    return itens;
  }
)

export const getOneAulaById = createSelector(
  selectAulaState, 
  getOneAulaSelected,
  areaFisicaFeature.getManyAreaFisica,
  arquivoPdfFeature.getManyArquivoPdf, (
    state,
    aulaSelected: number,
    areaFisicaMany: AreaFisicaModel[],
    arquivoPdfMany: ArquivoPdfModel[]
  ): AulaViewModel => {
    let item = new AulaViewModel();
    let aula = state.aulas.find(item => item.id == aulaSelected);
    let areaFisica: AreaFisicaModel | undefined = undefined;

    if (aula)
      areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == aula!.areaFisicaId)

    if (aula && areaFisica) {
      item.areaFisicaId = aula.areaFisicaId;
      item.aulaComentarioMany = aula.aulaComentarioMany;
      item.aulaSessaoMany = aula.aulaSessaoMany;
      item.comentario = aula.comentario;
      item.curtido = aula.curtido;
      item.dataAtualizacao = aula.dataAtualizacao;
      item.dataCadastro = aula.dataCadastro;
      item.favoritado = aula.favoritado;
      item.id = aula.id;
      item.professorId = aula.professorId;
      item.professorNome = aula.professorNome;
      item.resumo = aula.resumo;
      item.titulo = aula.titulo;
      item.publicado = aula.publicado;
      item.areaFisicaTitulo = areaFisica.titulo;
      item.aulaAnteriorId = aula.aulaAnteriorId;
      item.aulaPosteriorId = aula.aulaPosteriorId;
    }

    if (aula && arquivoPdfMany.length > 0) {
      let aulaSessaoMany: AulaSessaoModel[] = [];

      let arquivoPdfManyFiltrado = arquivoPdfMany.filter(item => item.aulaId == aulaSelected);

      aulaSessaoMany = aula.aulaSessaoMany.map(item => {

        if (item.aulaSessaoTipo == TipoSessaoAulaEnum.Pdf) {
          let arquivoPdf = arquivoPdfManyFiltrado.find(arquivoPdf => arquivoPdf.id == +item.conteudo);

          let aulaSessao: AulaSessaoModel = new AulaSessaoModel();
          aulaSessao.aulaId = item.aulaId;
          aulaSessao.aulaSessaoTipo = item.aulaSessaoTipo;
          aulaSessao.conteudo = item.conteudo;
          aulaSessao.dataAtualizacao = item.dataAtualizacao;
          aulaSessao.dataCadastro = item.dataCadastro;
          aulaSessao.favoritado = item.favoritado;
          aulaSessao.id = item.id;
          aulaSessao.ordem = item.ordem;
          aulaSessao.titulo = item.titulo;
          aulaSessao.arquivoPdf = arquivoPdf;
          return aulaSessao;
        }
        
        return item;
      });

      item.aulaSessaoMany = aulaSessaoMany.sort((a, b) => a.ordem - b.ordem);

      return item;
    }
    
    item.aulaSessaoMany = item.aulaSessaoMany.map(teste => {
        let aulaSessao: AulaSessaoModel = new AulaSessaoModel();
        aulaSessao.aulaId = teste.aulaId;
        aulaSessao.aulaSessaoTipo = teste.aulaSessaoTipo;
        aulaSessao.conteudo = teste.conteudo;
        aulaSessao.dataAtualizacao = teste.dataAtualizacao;
        aulaSessao.dataCadastro = teste.dataCadastro;
        aulaSessao.favoritado = teste.favoritado;
        aulaSessao.id = teste.id;
        aulaSessao.ordem = teste.ordem;
        aulaSessao.titulo = teste.titulo;

        return aulaSessao;
      })
      .sort((a, b) => a.ordem - b.ordem);

    return item;
  }
)

export const getProfessorInformacaoAulaMany = (professorId: number) => createSelector(
  getManyAulaByProfessorId(professorId), (
    aulaMany: AulaViewModel[],
  ): InformacaoAulaViewModel => {
    let informacaoAulaView = new InformacaoAulaViewModel();

    informacaoAulaView.aulaCriadaMany = aulaMany.length;

    let comentario: number = 0;
    let curtido: number = 0;

    aulaMany.forEach(item => {
      comentario += item.comentario;
      curtido += item.curtido;
    });

    informacaoAulaView.aulaComentarioMany = comentario;
    informacaoAulaView.aulaCurtidoMany = curtido;

    return informacaoAulaView;
  }
)

export const getManyAulaComentarioByAulaSelected = createSelector(
  getOneAulaSelected,
  aulaComentarioFeature.getAulaComentarioMany, (
    aulaSelected: number,
    aulaComentarioMany: AulaComentarioModel[],
  ): AulaComentarioModel[] => {

    return aulaComentarioMany
      .filter(item => item.aulaId == aulaSelected);
  }
)