import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNoticia from '../reducers/noticia.reducers';

import * as areaInteresseFeature from '../../../area-interesse/store';
import * as manipularContaFeature from '../../../manipular-conta/store';

import moment from 'moment';

import { 
  AreaInteresseModel, 
  InformacaoNoticiaViewModel, 
  NoticiaFilterModel, 
  NoticiaModel, 
  NoticiaViewModel, 
  UsuarioNoticiaFavoritadoModel
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
  areaInteresseFeature.getManyAreaInteresse,
  manipularContaFeature.getManyUsuarioNoticiaFavoritado, (
    state,
    areaInteresseMany: AreaInteresseModel[],
    usuarioNoticiaFavoritadoMany: UsuarioNoticiaFavoritadoModel[]
  ): NoticiaViewModel[] => {
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
        
        let usuarioNoticiaFavoritado = usuarioNoticiaFavoritadoMany.find(usuarioNoticiaFavoritado => usuarioNoticiaFavoritado.noticiaId == item.id);

        let noticiaViewModel: NoticiaViewModel = new NoticiaViewModel();
        noticiaViewModel.areaInteresseMany = areaInteresse;
        noticiaViewModel.conteudo = item.conteudo;
        noticiaViewModel.dataAtualizacao = item.dataAtualizacao;
        noticiaViewModel.dataCadastro = item.dataCadastro;
        noticiaViewModel.favoritado = item.favoritado;
        noticiaViewModel.id = item.id;
        noticiaViewModel.resumo = item.resumo;
        noticiaViewModel.titulo = item.titulo;
        noticiaViewModel.usuarioCadastroId = item.usuarioCadastroId;
        noticiaViewModel.usuarioCadastroNome = item.usuarioCadastroNome;
        noticiaViewModel.usuarioLogadoCurtiu = usuarioNoticiaFavoritado ? true : false

        return noticiaViewModel;
      });

    return itens;
})

export const getManyNoticiaFilter = createSelector(
  getNoticiaFilter,
  getManyNoticia, (
    noticiaFilter: NoticiaFilterModel,
    noticiaMany: NoticiaViewModel[],
  ): NoticiaViewModel[] => {

    let itens = noticiaMany;

    if (noticiaFilter && noticiaFilter.noticiaTitulo)
      itens = itens.filter(item => item.titulo.toLocaleLowerCase().includes(noticiaFilter.noticiaTitulo!.toLocaleLowerCase()));

    if (noticiaFilter && noticiaFilter.usuarioNome)
      itens = itens.filter(item => item.usuarioCadastroNome.toLocaleLowerCase().includes(noticiaFilter.usuarioNome!.toLocaleLowerCase()));

    if (noticiaFilter && noticiaFilter.dataInicio)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') >= moment(noticiaFilter.dataInicio!).startOf('day'));

    if (noticiaFilter && noticiaFilter.dataFim)
      itens = itens.filter(item => moment(item.dataCadastro!).startOf('day') <= moment(noticiaFilter.dataFim!).startOf('day'));


    if (noticiaFilter && noticiaFilter.areaInteresseMany && noticiaFilter.areaInteresseMany.length > 0) {
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
  getManyNoticiaFilter, (
    itens: NoticiaViewModel[]
  ): NoticiaViewModel[] => {

    return itens.filter(item => item.usuarioCadastroId == professorId);
  }
)

export const getManyNoticiaHome = createSelector(
  getManyNoticia, (
    itens: NoticiaViewModel[],
  ): NoticiaViewModel[] => {

    return itens.slice(0, 5).sort((a, b) => {
      return <any>new Date(b.dataCadastro!) - <any>new Date(a.dataCadastro!);
    });
  }
)

export const getProfessorInformacaoNoticiaMany = (professorId: number) => createSelector(
  getManyNoticiaByProfessorId(professorId), (
    noticiaMany: NoticiaViewModel[],
  ): InformacaoNoticiaViewModel => {
    let informacaoNoticiaView = new InformacaoNoticiaViewModel();

    informacaoNoticiaView.noticiaCriadaMany = noticiaMany.length;

    let curtido: number = 0;

    noticiaMany.forEach(item => {
      curtido += item.favoritado;
    });

    informacaoNoticiaView.noticiaCurtidoMany = curtido;

    return informacaoNoticiaView;
  }
)