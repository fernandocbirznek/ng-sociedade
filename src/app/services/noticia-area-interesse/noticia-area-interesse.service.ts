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

export class NoticiaAreaInteresseService {
    urlSelecionarManyAreaInteresseByNoticiaId = 'https://localhost:44362/api/NoticiaAreaInteresse/selecionar-areas-interesse-noticia'

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyAreaInteresseByNoticiaId(noticiaId: number): Observable<AreaInteresseModel[]> {
        return this.httpClient.get<AreaInteresseModel[]>(this.urlSelecionarManyAreaInteresseByNoticiaId + `/${noticiaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}