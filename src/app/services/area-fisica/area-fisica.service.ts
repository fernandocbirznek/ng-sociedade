import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaFisicaModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AreaFisicaService {
    urlSelecionarAreaFisicaMany = 'https://localhost:44303/api/AreaFisica/selecionar-areas-fisica';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarAreaFisicaMany(): Observable<AreaFisicaModel[]> {
        return this.httpClient.get<AreaFisicaModel[]>(this.urlSelecionarAreaFisicaMany, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}