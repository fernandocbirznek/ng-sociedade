import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";
import { aulaReducer, AulaState } from "../aula";
import { areaFisicaReducer, AreaFisicaState } from "../area-fisica";
import { aulaSessaoReducer, AulaSessaoState } from "../aula-sessao";
import { areaInteresseReducer, AreaInteresseState } from "../area-interesse";

export interface AppState {
    areaFisica: AreaFisicaState,
    areaInteresse: AreaInteresseState,
    aula: AulaState,
    aulaSessao: AulaSessaoState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState
};

export const reducers: ActionReducerMap<AppState> = {
    areaFisica: areaFisicaReducer,
    areaInteresse: areaInteresseReducer,
    aula: aulaReducer,
    aulaSessao: aulaSessaoReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];