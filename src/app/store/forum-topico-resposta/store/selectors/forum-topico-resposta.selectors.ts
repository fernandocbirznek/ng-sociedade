import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForumTopicoResposta from '../reducers/forum-topico-resposta.reducers';

import { 
    ForumTopicoReplicaModel,
    ForumTopicoRespostaModel, 
    ForumTopicoRespostaViewModel
} from 'src/app/models';

import * as forumTopicoReplicaFeature from '../../../forum-topico-replica/store';

import { 
    GenericoHelpers 
} from 'src/app/componentes';

export const getForumTopicoRespostaState = createFeatureSelector<fromForumTopicoResposta.ForumTopicoRespostaState>(
    fromForumTopicoResposta.forumTopicoRespostaFeatureKey
);

export const getManyForumTopicoResposta = createSelector(
    getForumTopicoRespostaState, (
        state
    ): ForumTopicoRespostaModel[] => {

    let itens = GenericoHelpers.sortArrayByDataCadastro(state.itens)

    return itens;
});

export const getManyForumTopicoRespostaByForumTopicoId = (forumTopicoId: number) => createSelector(
    getManyForumTopicoResposta,
    forumTopicoReplicaFeature.getManyForumTopicoReplicaByForumTopicoId(forumTopicoId), (
        forumTopicoRespostaMany: ForumTopicoRespostaModel[],
        forumTopicoReplicaMany: ForumTopicoReplicaModel[]
    ): ForumTopicoRespostaViewModel[] => {

    let itens = forumTopicoRespostaMany
        .filter(forumRespostaTopico => forumRespostaTopico.forumTopicoId == forumTopicoId)
        .map(forumRespostaTopico => {
            let item: ForumTopicoRespostaViewModel = new ForumTopicoRespostaViewModel();
            item.dataAtualizacao = forumRespostaTopico.dataAtualizacao;
            item.dataCadastro = forumRespostaTopico.dataCadastro;
            item.descricao = forumRespostaTopico.descricao;
            item.forumTopicoId = forumRespostaTopico.forumTopicoId;
            item.id = forumRespostaTopico.id;
            item.usuarioId = forumRespostaTopico.usuarioId;
            item.usuarioFoto = forumRespostaTopico.usuarioFoto;
            item.usuarioNome = forumRespostaTopico.usuarioNome;

            let forumTopicoReplicaFilter = 
                forumTopicoReplicaMany
                    .filter(forumTopicoReplica => forumTopicoReplica.forumTopicoRespostaId == forumRespostaTopico.id);

            item.forumReplicaCount = forumTopicoReplicaFilter.length;

            return item;
        });

    return itens;
});