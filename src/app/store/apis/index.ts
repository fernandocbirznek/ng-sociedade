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

export interface AppState {
    areaFisica: AreaFisicaState,
    areaInteresse: AreaInteresseState,
    aula: AulaState,
    aulaComentario: AulaComentarioState,
    aulaSessao: AulaSessaoState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState,
    usuario: UsuarioState,
    usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoState
};

export const reducers: ActionReducerMap<AppState> = {
    areaFisica: areaFisicaReducer,
    areaInteresse: areaInteresseReducer,
    aula: aulaReducer,
    aulaComentario: aulaComentarioReducer,
    aulaSessao: aulaSessaoReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer,
    usuario: usuarioReducer,
    usuarioAulaSessaoFavoritado: usuarioAulaSessaoFavoritadoReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];