import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTopicoReplica from '../reducers/forum-topico-replica.reducers';

import { 
  ForumTopicoReplicaModel 
} from 'src/app/models';

import { 
    GenericoHelpers 
} from 'src/app/componentes';

export const getForumTopicoReplicaState = createFeatureSelector<fromForumTopicoReplica.ForumTopicoReplicaState>(
    fromForumTopicoReplica.forumTopicoReplicaFeatureKey
);

export const getManyForumTopicoReplica = createSelector(
    getForumTopicoReplicaState, (
        state
    ): ForumTopicoReplicaModel[] => {

    let itens = GenericoHelpers.sortArrayByDataCadastro(state.itens);

    return itens;
});

export const getManyForumTopicoReplicaByForumTopicoId = (forumTopicoId: number) => createSelector(
    getManyForumTopicoReplica, (
        itens: ForumTopicoReplicaModel[]
    ): ForumTopicoReplicaModel[] => {

    return itens.filter(item => item.forumTopicoId == forumTopicoId);
});

export const getManyForumTopicoReplicaByForumTopicoRespostaId = (forumTopicoRespostaId: number) => createSelector(
    getManyForumTopicoReplica, (
        itens: ForumTopicoReplicaModel[]
    ): ForumTopicoReplicaModel[] => {

    return itens.filter(item => item.forumTopicoRespostaId == forumTopicoRespostaId);
});