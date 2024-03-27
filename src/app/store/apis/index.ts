import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";
import { aulaReducer, AulaState } from "../aula";
import { areaFisicaReducer, AreaFisicaState } from "../area-fisica";
import { aulaSessaoReducer, AulaSessaoState } from "../aula-sessao";
import { areaInteresseReducer, AreaInteresseState } from "../area-interesse";
import { usuarioReducer, UsuarioState } from "../usuario";

export interface AppState {
    areaFisica: AreaFisicaState,
    areaInteresse: AreaInteresseState,
    aula: AulaState,
    aulaSessao: AulaSessaoState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState,
    usuario: UsuarioState
};

export const reducers: ActionReducerMap<AppState> = {
    areaFisica: areaFisicaReducer,
    areaInteresse: areaInteresseReducer,
    aula: aulaReducer,
    aulaSessao: aulaSessaoReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer,
    usuario: usuarioReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];