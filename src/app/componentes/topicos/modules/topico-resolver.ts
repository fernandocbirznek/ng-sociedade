import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    selecionarManyAreaFisicaDivisaoByAreaFisicaId,
    selecionarManyArquivoPdfByAulaId, 
    selecionarManyAulaByAreaFisicaId
} from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class TopicoResolver {

    constructor(
        public store: Store,
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let areaFisicaId = route.paramMap.get('areaFisicaId');
        if (areaFisicaId) {
            this.store.dispatch(selecionarManyAulaByAreaFisicaId({ areaFisicaId: +areaFisicaId}));
            this.store.dispatch(selecionarManyAreaFisicaDivisaoByAreaFisicaId({ areaFisicaId: +areaFisicaId}));
            return true;
        }  

        return false;
    }
}
