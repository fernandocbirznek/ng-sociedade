import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { 
    UsuarioModel 
} from "../../../models";

import { 
    selecionarManyAulaByProfessorId, 
    selecionarManyUsuarioAulaCurtido, 
    selecionarManyUsuarioAulaFavoritada, 
    selecionarNoticiaManyByProfessorId 
} from "../../../store";

@Injectable({ providedIn: 'root' })
export class PerfilProfessorResolver  {

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
            this.store.dispatch(selecionarManyAulaByProfessorId({ professorId: +id}));
            this.store.dispatch(selecionarNoticiaManyByProfessorId({ professorId: +id}));
            this.store.dispatch(selecionarManyUsuarioAulaCurtido({ usuarioId: +id }));
            this.store.dispatch(selecionarManyUsuarioAulaFavoritada({ usuarioId: +id }));
            return true;
        }  

        return false;
    }
}