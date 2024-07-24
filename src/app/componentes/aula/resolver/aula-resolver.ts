import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    atualizarAulaSelected,
    selecionarManyArquivoPdfByAulaId, 
    selecionarManyAulaComentarioByAulaId, 
    selecionarManyAulaSessaoByAulaId, 
    selecionarOneAulaById
} from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class AulaResolver {

    constructor(
        public store: Store,
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let id = route.paramMap.get('id');

        if (id) {
            this.store.dispatch(selecionarManyAulaSessaoByAulaId({ aulaId: +id}));
            this.store.dispatch(selecionarManyArquivoPdfByAulaId({ aulaId: +id}));
            this.store.dispatch(selecionarOneAulaById({ aulaId: +id }));
            this.store.dispatch(selecionarManyAulaComentarioByAulaId({ aulaId: +id }));
            this.store.dispatch(atualizarAulaSelected({ aulaId: +id}));

            return true;
        }  

        return false;
    }
}
