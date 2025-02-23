import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTagModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ForumTagService {
    private readonly baseUrl = `${environment.forumApiUrl}/ForumTag`;

    urlSelecionarManyForumTag = `${this.baseUrl}/selecionar-forum-tag-sistema`;
    urlInserirForumTag = `${this.baseUrl}/inserir`;
    urlExcluirForumTag = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTag(): Observable<ForumTagModel[]> {
        return this.httpClient.get<ForumTagModel[]>(this.urlSelecionarManyForumTag, this.buildHttpOptions());
    }

    inserirForumTag(forumTag: ForumTagModel): Observable<ForumTagModel> {
        return this.httpClient.post<ForumTagModel>(this.urlInserirForumTag, JSON.stringify(forumTag), this.buildHttpOptions());
    }

    excluirForumTag(forumTagId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirForumTag + `/${forumTagId}`, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}