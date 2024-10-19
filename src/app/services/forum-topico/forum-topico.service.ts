import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTopicoViewModel,
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoService {
    urlSelecionarManyForumTopico = 'https://localhost:44361/api/ForumTopico/selecionar-topicos-forum';
    urlSelecionarManyForumTopicoByForumId = 'https://localhost:44361/api/ForumTopico/selecionar-forum-topico';
    urlInserirForumTopico = 'https://localhost:44361/api/ForumTopico/inserir';
    urlAtualizarForumTopico = 'https://localhost:44361/api/ForumTopico/atualizar';
    urlExcluirForumTopico = 'https://localhost:44361/api/ForumTopico/excluir';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTopico(): Observable<ForumTopicoViewModel[]> {
        return this.httpClient.get<ForumTopicoViewModel[]>(this.urlSelecionarManyForumTopico, this.buildHttpOptions());
    }

    selecionarManyForumTopicoByForumId(forumId: number): Observable<ForumTopicoViewModel[]> {
        return this.httpClient.get<ForumTopicoViewModel[]>(
            this.urlSelecionarManyForumTopicoByForumId + `/${forumId}`, 
            this.buildHttpOptions()
        );
    }

    inserirForumTopico(forumTopico: ForumTopicoViewModel): Observable<ForumTopicoViewModel> {
        return this.httpClient.post<ForumTopicoViewModel>(
            this.urlInserirForumTopico, 
            JSON.stringify(forumTopico), 
            this.buildHttpOptions()
        );
    }

    atualizarForumTopico(forumTopico: ForumTopicoViewModel): Observable<ForumTopicoViewModel> {
        return this.httpClient.put<ForumTopicoViewModel>(
            this.urlAtualizarForumTopico, 
            JSON.stringify(forumTopico), 
            this.buildHttpOptions()
        );
    }

    excluirForumTopico(forumTopicoId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirForumTopico + `/${forumTopicoId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}