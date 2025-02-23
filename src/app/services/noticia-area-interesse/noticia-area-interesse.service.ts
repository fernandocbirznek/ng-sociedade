import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaInteresseModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class NoticiaAreaInteresseService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/NoticiaAreaInteresse`;

    urlSelecionarManyAreaInteresseByNoticiaId = `${this.baseUrl}/selecionar-areas-interesse-noticia`;

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