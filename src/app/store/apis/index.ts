import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import { manipularContaReducer, ManipularContaState } from "../manipular-conta";
import { NoticiaState, noticiaReducer } from "../noticia";

export interface AppState {
    manipularConta: ManipularContaState,
    noticia: NoticiaState
};

export const reducers: ActionReducerMap<AppState> = {
    manipularConta: manipularContaReducer,
    noticia: noticiaReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];