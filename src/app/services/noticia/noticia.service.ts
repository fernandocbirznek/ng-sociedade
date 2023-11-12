import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    NoticiaModel, 
    NoticiaRequestModel 
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class NoticiaService {
    urlInserirNoticia = 'https://localhost:44362/api/Noticia/inserir';
    urlAtualizarNoticia = 'https://localhost:44362/api/Noticia/atualizar';
    urlExcluirNoticia = 'https://localhost:44362/api/Noticia/excluir';
    urlSelecionarManyNoticia = 'https://localhost:44362/api/Noticia/selecionar-noticias-home';
    urlSelecionarOneNoticia = 'https://localhost:44362/api/Noticia/selecionar-noticia';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}
    inserirNoticia(noticia: NoticiaRequestModel): Observable<NoticiaModel> {
        return this.httpClient.post<NoticiaModel>(this.urlInserirNoticia, JSON.stringify(noticia), this.buildHttpOptions());
    }

    atualizarNoticia(noticia: NoticiaRequestModel): Observable<NoticiaModel> {
        return this.httpClient.put<NoticiaModel>(this.urlAtualizarNoticia, JSON.stringify(noticia), this.buildHttpOptions());
    }

    excluirNoticia(noticia: NoticiaModel): Observable<NoticiaModel> {
        return this.httpClient.delete<NoticiaModel>(this.urlExcluirNoticia + `/${noticia.id}`);
    }

    selecionarManyNoticia(): Observable<NoticiaModel[]> {
        return this.httpClient.get<NoticiaModel[]>(this.urlSelecionarManyNoticia);
    }

    selecionarOneNoticia(noticiaId: number): Observable<NoticiaModel> {
        return this.httpClient.get<NoticiaModel>(this.urlSelecionarManyNoticia + `/${noticiaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}