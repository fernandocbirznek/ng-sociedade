import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { 
    UsuarioModel 
} from "../../../models";

import { 
    selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId,
    selecionarWidgetConcluidoByUsuarioId, 
    selecionarWidgetCursandoByUsuarioId, 
    selecionarWidgetCursarByUsuarioId 
} from "../../../store";


@Injectable({ providedIn: 'root' })
export class UsuarioAlunoResolver  {

    usuarioLogadoSubscription$: Subscription = new Subscription();
    usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();
    usuarioLogado: UsuarioModel | undefined = undefined;

    constructor(
        public store: Store,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let id = route.paramMap.get('id');
        if (id) {
            this.store.dispatch(selecionarWidgetConcluidoByUsuarioId({ usuarioId: +id }));
            this.store.dispatch(selecionarWidgetCursandoByUsuarioId({ usuarioId: +id }));
            this.store.dispatch(selecionarWidgetCursarByUsuarioId({ usuarioId: +id }));
            this.store.dispatch(selecionarManyUsuarioAulaSessaoFavoritadoByUsuarioId({ usuarioId: +id }));
            return true;
        }  

        return false;
    }
}