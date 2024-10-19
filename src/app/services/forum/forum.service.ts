import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AdministradorHomeForumInformacaoModel,
    ForumModel,
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class ForumService {
    urlSelecionarManyForum = 'https://localhost:44361/api/Forum/selecionar-forum-sistema';
    urlInserirForum = 'https://localhost:44361/api/Forum/inserir';
    urlAtualizarForum = 'https://localhost:44361/api/Forum/atualizar';
    urlExcluirForum = 'https://localhost:44361/api/Forum/excluir';

    urlSelecionarAdministradorHomeAulaInformacao = 'https://localhost:44361/api/administrador-home/selecionar-forum-informacao';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForum(): Observable<ForumModel[]> {
        return this.httpClient.get<ForumModel[]>(this.urlSelecionarManyForum, this.buildHttpOptions());
    }

    inserirForum(forum: ForumModel): Observable<ForumModel> {
        return this.httpClient.post<ForumModel>(this.urlInserirForum, JSON.stringify(forum), this.buildHttpOptions());
    }

    atualizarForum(forum: ForumModel): Observable<ForumModel> {
        return this.httpClient.put<ForumModel>(this.urlAtualizarForum, JSON.stringify(forum), this.buildHttpOptions());
    }

    excluirForum(forumId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirForum + `/${forumId}`, this.buildHttpOptions());
    }

    selecionarAdministradorHomeForumInformacao(): Observable<AdministradorHomeForumInformacaoModel> {
        return this.httpClient.get<AdministradorHomeForumInformacaoModel>(this.urlSelecionarAdministradorHomeAulaInformacao, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}