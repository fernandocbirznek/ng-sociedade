import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    selecionarAdministradorHomeAulaInformacao,
    selecionarAdministradorHomeForumInformacao,
    selecionarManyAula,
    selecionarManyForumTopico,
    selecionarManyNoticia,
    selecionarManyUsuario,
} from "../../../store";


@Injectable({ providedIn: 'root' })
export class AdministradorResolver  {

    constructor(
        public store: Store,
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let id = route.paramMap.get('id');
        if (id) {
            this.store.dispatch(selecionarManyAula());
            this.store.dispatch(selecionarManyNoticia());
            this.store.dispatch(selecionarManyUsuario());
            this.store.dispatch(selecionarManyForumTopico());
            this.store.dispatch(selecionarAdministradorHomeAulaInformacao());
            this.store.dispatch(selecionarAdministradorHomeForumInformacao());
            return true;
        }  

        return false;
    }
}