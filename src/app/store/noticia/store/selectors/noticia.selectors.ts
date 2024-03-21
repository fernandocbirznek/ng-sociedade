import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNoticia from '../reducers/noticia.reducers';

import * as areaInteresseFeature from '../../../area-interesse/store';
import { AreaInteresseModel, NoticiaModel } from 'src/app/models';

export const selecionarNoticiaState = createFeatureSelector<fromNoticia.NoticiaState>(
  fromNoticia.noticiaFeatureKey
);

export const selecionarManyNoticia = createSelector(selecionarNoticiaState, (state) => {
  return state.itens;
})

export const getOneNoticiaById = (noticiaId: number) => createSelector(selecionarNoticiaState, (state) => {
  return state.itens.find(item => item.id == noticiaId);
})

export const getManyNoticiaByProfessorId = (professorId: number) => createSelector(
  areaInteresseFeature.getAreaInteresseMany,
  selecionarNoticiaState, (
    areaInteresseMany: AreaInteresseModel[],
    state
  ) => {
    let itens = 
      state
      .itens
      .filter(item => item.usuarioCadastroId == professorId)
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
        noticia.usuarioCadastroId = item.usuarioCadastroId;
        noticia.usuarioCadastroNome = item.usuarioCadastroNome;
        noticia.areaInteresseMany = areaInteresse;

        return noticia;
      });

    return itens;
  }
)