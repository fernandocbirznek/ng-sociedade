import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTopico from '../reducers/forum-topico.reducers';

import * as forumTopicoRespostaFeature from '../../../forum-topico-resposta/store';

import { 
  ForumTopicoRespostaViewModel, 
  ForumTopicoViewModel 
} from '../../../../models';

export const getForumTopicoState = createFeatureSelector<fromForumTopico.ForumTopicoState>(
    fromForumTopico.forumTopicoFeatureKey
);

export const getManyForumTopico = createSelector(getForumTopicoState, (state) => {
  
  return state.itens;
})

export const getOneForumTopicoById = (forumTopicoId: number) => createSelector(
  getManyForumTopico,
  forumTopicoRespostaFeature.getManyForumTopicoRespostaByForumTopicoId(forumTopicoId), (
    itens: ForumTopicoViewModel[],
    forumTopicoRespostaMany: ForumTopicoRespostaViewModel[]
  ): ForumTopicoViewModel | undefined => {

    let forumTopico = itens.find(item => item.id == forumTopicoId);

    if (!forumTopico)
      return undefined;

    let item: ForumTopicoViewModel = new ForumTopicoViewModel();
    item.dataAtualizacao = forumTopico.dataAtualizacao;
    item.dataCadastro = forumTopico.dataCadastro;
    item.descricao = forumTopico.descricao;
    item.forumId = forumTopico.forumId;
    item.forumTagMany = forumTopico.forumTagMany;
    item.forumTopicoEnum = forumTopico.forumTopicoEnum;
    item.id = forumTopico.id;
    item.titulo = forumTopico.titulo;
    item.usuarioId = forumTopico.usuarioId;

    item.usuarioFoto = forumTopico.usuarioFoto;
    item.usuarioNome = forumTopico.usuarioNome;

    item.topicoRespostaCount = forumTopicoRespostaMany.length;

    return item;
  }
)