import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTopicoResposta from '../reducers/forum-topico-resposta.reducers';

import { 
  ForumTopicoRespostaModel 
} from 'src/app/models';

export const getForumTopicoRespostaState = createFeatureSelector<fromForumTopicoResposta.ForumTopicoRespostaState>(
    fromForumTopicoResposta.forumTopicoRespostaFeatureKey
);

export const getManyForumTopicoResposta = createSelector(
    getForumTopicoRespostaState, (
        state
    ): ForumTopicoRespostaModel[] => {

    return state.itens;
});

export const getManyForumTopicoRespostaByForumTopicoId = (forumTopicoId: number) => createSelector(
    getManyForumTopicoResposta, (
        itens: ForumTopicoRespostaModel[]
    ): ForumTopicoRespostaModel[] => {

    return itens.filter(item => item.forumTopicoId == forumTopicoId);
});