import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    NoticiaModel, 
    NoticiaRequestModel 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class NoticiaService {
    urlInserirNoticia = 'https://localhost:44362/api/Noticia/inserir';
    urlAtualizarNoticia = 'https://localhost:44362/api/Noticia/atualizar';
    urlExcluirNoticia = 'https://localhost:44362/api/Noticia/excluir';
    urlSelecionarManyNoticia = 'https://localhost:44362/api/Noticia/selecionar-noticias-sistema';
    urlSelecionarNoticiaManyHome = 'https://localhost:44362/api/Noticia/selecionar-noticia-many/home';
    urlSelecionarNoticiaManyProfessor = 'https://localhost:44362/api/Noticia/selecionar-noticia-many';

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

    selecionarNoticiaManyHome(): Observable<NoticiaModel[]> {
        return this.httpClient.get<NoticiaModel[]>(this.urlSelecionarNoticiaManyHome);
    }

    selecionarNoticiaManyProfessor(professorId: number): Observable<NoticiaModel[]> {
        return this.httpClient.get<NoticiaModel[]>(this.urlSelecionarNoticiaManyProfessor + `/${professorId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}