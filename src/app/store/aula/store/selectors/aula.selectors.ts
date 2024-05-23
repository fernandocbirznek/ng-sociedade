import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAula from '../reducers/aula.reducers';

import { 
  AreaFisicaModel,
  AulaFilterModel,
  AulaModel, 
  TagModel,
  TipoOrdenarAulaFiltroEnum
} from 'src/app/models';

import * as areaFisicaFeature from '../../../area-fisica/store';
import * as headerFeature from '../../../header/store';
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

export const getManyAula = createSelector(
  selectAulaState, 
  areaFisicaFeature.getManyAreaFisica,
  tagFeature.getManyTag, (
    state,
    areaFisicaMany: AreaFisicaModel[],
    tagMany: TagModel[]
  ) => {

    let itens: AulaModel[] = 
    state
      .aulas
      .map(item => {
        let areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == item.areaFisicaId);
        let tags: TagModel[] = [];
        let aulaModel: AulaModel = {...item};
        if (areaFisica)
          aulaModel.areaFisicaDescricao = areaFisica.descricao;

        if (item.aulaTagMany.length > 0) {
          item.aulaTagMany.forEach(aulaTag => {
            let tag = tagMany.find(tag => tag.id == aulaTag.tagId);
            if (tag)
              tags.push(tag);
          });
        }

        aulaModel.tagMany = tags;
        aulaModel.comentario = item.aulaComentarioMany.length;
        return aulaModel;
      });

    return itens;
  }
)

export const getManyAulaByFilter = createSelector(
  getOneAulaFilter,
  getManyAula, (
    aulaFilter: AulaFilterModel,
    aulaMany: AulaModel[],
  ): AulaModel[] => {

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

    return itens;
  }
)

export const getManyAulaByProfessorId = (professorId: number) => createSelector(
  selectAulaState,
  areaFisicaFeature.getManyAreaFisica, (
    state,
    areaFisicaMany: AreaFisicaModel[]
  ) => {
  let itens: AulaModel[] = 
    state
      .aulas
      .filter(item => item.professorId == professorId)
      .map(item => {
        let areaFisica = areaFisicaMany.find(areaFisica => areaFisica.id == item.areaFisicaId);
        let aulaModel = {...item};
        if (areaFisica)
          aulaModel.areaFisicaDescricao = areaFisica.descricao;
        aulaModel.comentario = item.aulaComentarioMany.length;
        return aulaModel;
      });

    return itens;
  }
)

export const getManyAulaByAreaFisicaId = createSelector(
  getManyAulaByFilter,
  headerFeature.getAreaFisicaId, (
    aulaMany,
    areaFisicaId: number
  ): AulaModel[] => {
  let itens = aulaMany.filter(item => item.areaFisicaId == areaFisicaId);

    return itens;
  }
)

export const getOneAulaById = (aulaId: number) => createSelector(
  selectAulaState, 
  areaFisicaFeature.getManyAreaFisica, (
    state,
    areaFisicaMany: AreaFisicaModel[]
  ) => {
    let item = new AulaModel();
    let aula = state.aulas.find(item => item.id == aulaId);
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
      item.areaFisicaDescricao = areaFisica.descricao;
    }

    return item;
  }
)