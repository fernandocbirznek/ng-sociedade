import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AreaInteresseModel,
    NoticiaAreaInteresseModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class NoticiaAreaInteresseService {
    urlSelecionarManyAreaInteresseByNoticiaId = 'https://localhost:44362/api/NoticiaAreaInteresse/selecionar-areas-interesse-noticia'

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    // inserirNoticia(noticia: NoticiaRequestModel): Observable<NoticiaModel> {
    //     return this.httpClient.post<NoticiaModel>(this.urlInserirNoticia, JSON.stringify(noticia), this.buildHttpOptions());
    // }

    // excluirNoticia(noticia: NoticiaModel): Observable<NoticiaModel> {
    //     return this.httpClient.delete<NoticiaModel>(this.urlExcluirNoticia + `/${noticia.id}`);
    // }

    selecionarManyAreaInteresseByNoticiaId(noticiaId: number): Observable<AreaInteresseModel[]> {
        return this.httpClient.get<AreaInteresseModel[]>(this.urlSelecionarManyAreaInteresseByNoticiaId + `/${noticiaId}`);
    }

    // selecionarOneNoticia(noticiaId: number): Observable<NoticiaModel> {
    //     return this.httpClient.get<NoticiaModel>(this.urlSelecionarManyNoticia + `/${noticiaId}`);
    // }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}