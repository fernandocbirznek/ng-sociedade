import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNoticia from '../reducers/noticia.reducers';

import * as areaInteresseFeature from '../../../area-interesse/store';

import moment from 'moment';

import { 
  AreaInteresseModel, 
  NoticiaFilterModel, 
  NoticiaModel 
} from 'src/app/models';

export const selecionarNoticiaState = createFeatureSelector<fromNoticia.NoticiaState>(
  fromNoticia.noticiaFeatureKey
);

export const getNoticiaFilter = createSelector(
  selecionarNoticiaState, (
    state
  ) => {

    return state.noticiaFilter;
  }
)

export const getManyNoticia = createSelector(
  selecionarNoticiaState,
  areaInteresseFeature.getAreaInteresseMany, (
    state,
    areaInteresseMany: AreaInteresseModel[],
  ): NoticiaModel[] => {
  let itens = 
      state
      .itens
      .map(item => {
        let areaInteresse: AreaInteresseModel[] = [];
        if (item.areaInteresseMany) {
          areaInteresse = areaInteresseMany
            .filter(areaInteresse => 
              item
                .areaInteresseMany
                .some(itemAreaInteresse => itemAreaInteresse.id == areaInteresse.id)
            )
        }
        
        let noticia: NoticiaModel = new NoticiaModel();
        noticia.conteudo = item.conteudo;
        noticia.dataAtualizacao = item.dataAtualizacao;
        noticia.dataCadastro = item.dataCadastro;
        noticia.id = item.id;
        noticia.resumo = item.resumo;
        noticia.titulo = item.titulo;
        noticia.favoritado = item.favoritado;
        noticia.usuarioCadastroId = item.usuarioCadastroId;
        noticia.usuarioCadastroNome = item.usuarioCadastroNome;
        noticia.areaInteresseMany = areaInteresse;

        return noticia;
      });

    return itens;
})

export const getManyNoticiaFilter = createSelector(
  getNoticiaFilter,
  getManyNoticia, (
    noticiaFilter: NoticiaFilterModel,
    noticiaMany: NoticiaModel[],
  ) => {

    let itens = noticiaMany;

    if (noticiaFilter && noticiaFilter.noticiaTitulo)
      itens = itens.filter(item => item.titulo.toLocaleLowerCase().includes(noticiaFilter.noticiaTitulo!.toLocaleLowerCase()));

    if (noticiaFilter && noticiaFilter.usuarioNome)
      itens = itens.filter(item => item.usuarioCadastroNome.toLocaleLowerCase().includes(noticiaFilter.usuarioNome!.toLocaleLowerCase()));

    if (noticiaFilter && noticiaFilter.dataInicio)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') >= moment(noticiaFilter.dataInicio!).startOf('day'));

    if (noticiaFilter && noticiaFilter.dataFim)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') <= moment(noticiaFilter.dataFim!).startOf('day'));

    if (noticiaFilter && noticiaFilter.areaInteresseMany.length > 0) {
      itens = itens.filter(item => item
        .areaInteresseMany
        .some(areaInteresse => noticiaFilter.areaInteresseMany.some(area => area.id == areaInteresse.id))
      )
    } 

    return itens;
  }
)

export const getOneNoticiaById = (noticiaId: number) => createSelector(selecionarNoticiaState, (state) => {
  return state.itens.find(item => item.id == noticiaId);
})

export const getManyNoticiaByProfessorId = (professorId: number) => createSelector(
  getManyNoticia, (
    itens: NoticiaModel[]
  ) => {

    return itens.filter(item => item.usuarioCadastroId == professorId);
  }
)

export const getManyNoticiaHome = createSelector(
  getManyNoticia, (
    itens: NoticiaModel[]
  ) => {

    return itens.slice(0, 5).sort((a, b) => {
      return <any>new Date(b.dataCadastro!) - <any>new Date(a.dataCadastro!);
    });
  }
)