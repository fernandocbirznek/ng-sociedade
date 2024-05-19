import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";
import { aulaReducer, AulaState } from "../aula";
import { areaFisicaReducer, AreaFisicaState } from "../area-fisica";
import { aulaSessaoReducer, AulaSessaoState } from "../aula-sessao";
import { areaInteresseReducer, AreaInteresseState } from "../area-interesse";
import { usuarioReducer, UsuarioState } from "../usuario";
import { aulaComentarioReducer, AulaComentarioState } from "../aula-comentario";
import { usuarioAulaSessaoFavoritadoReducer, UsuarioAulaSessaoFavoritadoState } from "../usuario-aula-sessao-favoritado";
import { forumReducer, ForumState } from "../forum";
import { forumTopicoReducer, ForumTopicoState } from "../forum-topico";
import { forumTagReducer, ForumTagState } from "../forum-tag";
import { forumTopicoRespostaReducer, ForumTopicoRespostaState } from "../forum-topico-resposta";
import { forumTopicoReplicaReducer, ForumTopicoReplicaState } from "../forum-topico-replica";
import { headerReducer, HeaderState } from "../header";
import { tagReducer, TagState } from "../tag";

export interface AppState {
    areaFisica: AreaFisicaState,
    areaInteresse: AreaInteresseState,
    aula: AulaState,
    aulaComentario: AulaComentarioState,
    aulaSessao: AulaSessaoState,
    forum: ForumState,
    forumTag: ForumTagState,
    forumTopico: ForumTopicoState,
    forumTopicoReplica: ForumTopicoReplicaState,
    forumTopicoResposta: ForumTopicoRespostaState,
    header: HeaderState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState,
    tag: TagState,
    usuario: UsuarioState,
    usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoState
};

export const reducers: ActionReducerMap<AppState> = {
    areaFisica: areaFisicaReducer,
    areaInteresse: areaInteresseReducer,
    aula: aulaReducer,
    aulaComentario: aulaComentarioReducer,
    aulaSessao: aulaSessaoReducer,
    forum: forumReducer,
    forumTag: forumTagReducer,
    forumTopico: forumTopicoReducer,
    forumTopicoReplica: forumTopicoReplicaReducer,
    forumTopicoResposta: forumTopicoRespostaReducer,
    header: headerReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer,
    tag: tagReducer,
    usuario: usuarioReducer,
    usuarioAulaSessaoFavoritado: usuarioAulaSessaoFavoritadoReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];