import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaInteresseModel,
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class AreaInteresseService {
    urlSelecionarAreaInteresseMany = 'https://localhost:44362/api/AreaInteresse/selecionar-area-interesse';
    urlInserirAreaInteresse = 'https://localhost:44362/api/AreaInteresse/inserir';
    urlExcluirAreaInteresse = 'https://localhost:44362/api/AreaInteresse/excluir';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarAreaInteresseMany(): Observable<AreaInteresseModel[]> {
        return this.httpClient.get<AreaInteresseModel[]>(this.urlSelecionarAreaInteresseMany, this.buildHttpOptions());
    }

    inserirAreaInteresse(areaInteresse: AreaInteresseModel): Observable<AreaInteresseModel> {
        return this.httpClient.post<AreaInteresseModel>(this.urlInserirAreaInteresse, JSON.stringify(areaInteresse), this.buildHttpOptions());
    }

    excluirAreaInteresse(areaInteresseId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirAreaInteresse + `/${areaInteresseId}`, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}