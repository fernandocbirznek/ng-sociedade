import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    selecionarManyArquivoPdfByAulaId 
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
            this.store.dispatch(selecionarManyArquivoPdfByAulaId({ aulaId: +id}));
            return true;
        }  

        return false;
    }
}
