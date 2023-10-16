import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { manipularContaReducer, ManipularContaState } from "../manipular-conta";

export interface AppState {
    manipularConta: ManipularContaState
};

export const reducers: ActionReducerMap<AppState> = {
    manipularConta: manipularContaReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];