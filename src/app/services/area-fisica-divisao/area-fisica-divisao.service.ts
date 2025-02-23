import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaFisicaDivisaoModel,
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AreaFisicaDivisaoService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AreaFisicaDivisao`;
    urlSelecionarManyAreaFisicaDivisaoByAreaFisicaId = `${this.baseUrl}/selecionar-area-fisica-divisao`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyAreaFisicaDivisaoByAreaFisicaId(areaFisicaId: number): Observable<AreaFisicaDivisaoModel[]> {
        return this.httpClient.get<AreaFisicaDivisaoModel[]>(
            this.urlSelecionarManyAreaFisicaDivisaoByAreaFisicaId + `/${areaFisicaId}`, 
            this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}