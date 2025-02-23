import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    NoticiaModel, 
    NoticiaRequestModel 
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class NoticiaService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/Noticia`;

    urlInserirNoticia = `${this.baseUrl}/inserir`;
    urlAtualizarNoticia = `${this.baseUrl}/atualizar`;
    urlExcluirNoticia = `${this.baseUrl}/excluir`;
    urlSelecionarManyNoticia = `${this.baseUrl}/selecionar-noticias-sistema`;
    urlSelecionarNoticiaManyHome = `${this.baseUrl}/selecionar-noticia-many/home`;
    urlSelecionarNoticiaManyProfessor = `${this.baseUrl}/selecionar-noticia-many`;

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