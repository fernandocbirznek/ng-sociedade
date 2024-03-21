import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaInteresseModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AreaInteresseService {
    urlSelecionarAreaInteresseMany = 'https://localhost:44362/api/AreaInteresse/selecionar-area-interesse';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarAreaInteresseMany(): Observable<AreaInteresseModel[]> {
        return this.httpClient.get<AreaInteresseModel[]>(this.urlSelecionarAreaInteresseMany, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}