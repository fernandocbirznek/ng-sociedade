import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaFisicaModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AreaFisicaService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AreaFisica`;
    urlSelecionarAreaFisicaMany = `${this.baseUrl}/selecionar-areas-fisica`;
    urlInserirAreaFisica = `${this.baseUrl}/inserir`;
    urlAtualizarAreaFisica = `${this.baseUrl}/atualizar`;
    urlRemoverAreaFisica = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarAreaFisicaMany(): Observable<AreaFisicaModel[]> {
        return this.httpClient.get<AreaFisicaModel[]>(this.urlSelecionarAreaFisicaMany, this.buildHttpOptions());
    }

    inserirAreaFisica(areaFisica: AreaFisicaModel): Observable<AreaFisicaModel> {
        return this.httpClient.post<AreaFisicaModel>(this.urlInserirAreaFisica, JSON.stringify(areaFisica), this.buildHttpOptions());
    }

    atualizarAreaFisica(areaFisica: AreaFisicaModel): Observable<AreaFisicaModel> {
        return this.httpClient.put<AreaFisicaModel>(this.urlAtualizarAreaFisica, JSON.stringify(areaFisica), this.buildHttpOptions());
    }

    removerAreaFisica(areaFisicaId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverAreaFisica + `/${areaFisicaId}`, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}