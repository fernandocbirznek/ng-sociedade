import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";
import { aulaReducer, AulaState } from "../aula";

export interface AppState {
    aula: AulaState,
    manipularConta: ManipularContaState,
    noticia: NoticiaState
};

export const reducers: ActionReducerMap<AppState> = {
    aula: aulaReducer,
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];