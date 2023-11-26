import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";
import { aulaReducer, AulaState } from "../aula";
import { areaFisicaReducer, AreaFisicaState } from "../area-fisica";
import { aulaSessaoReducer, AulaSessaoState } from "../aula-sessao";

export interface AppState {
    areaFisica: AreaFisicaState,
    aula: AulaState,
    aulaSessao: AulaSessaoState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState
};

export const reducers: ActionReducerMap<AppState> = {
    areaFisica: areaFisicaReducer,
    aula: aulaReducer,
    aulaSessao: aulaSessaoReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];