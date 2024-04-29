import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTopicoModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoService {
    urlSelecionarManyForumTopicoByForumId = 'https://localhost:44361/api/ForumTopico/selecionar-forum-topico';
    urlInserirForumTopico = 'https://localhost:44361/api/ForumTopico/inserir';
    urlAtualizarForumTopico = 'https://localhost:44361/api/ForumTopico/atualizar';
    urlExcluirForumTopico = 'https://localhost:44361/api/ForumTopico/excluir';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTopicoByForumId(forumId: number): Observable<ForumTopicoModel[]> {
        return this.httpClient.get<ForumTopicoModel[]>(
            this.urlSelecionarManyForumTopicoByForumId + `/${forumId}`, 
            this.buildHttpOptions()
        );
    }

    inserirForumTopico(forumTopico: ForumTopicoModel): Observable<ForumTopicoModel> {
        return this.httpClient.post<ForumTopicoModel>(
            this.urlInserirForumTopico, 
            JSON.stringify(forumTopico), 
            this.buildHttpOptions()
        );
    }

    atualizarForumTopico(forumTopico: ForumTopicoModel): Observable<ForumTopicoModel> {
        return this.httpClient.put<ForumTopicoModel>(
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