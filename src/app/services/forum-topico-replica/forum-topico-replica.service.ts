import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTopicoReplicaModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoReplicaService {
    private readonly baseUrl = `${environment.forumApiUrl}/ForumTopicoReplica`;
    
    urlSelecionarManyForumTopicoReplicaByForumTopicoId = `${this.baseUrl}/selecionar-forum-topico-replica`;
    urlInserirForumTopicoReplica = `${this.baseUrl}/inserir`;
    urlAtualizarForumTopicoReplica = `${this.baseUrl}/atualizar`;
    urlExcluirForumTopicoReplica = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTopicoReplicaByForumTopicoId(forumTopicoId: number): Observable<ForumTopicoReplicaModel[]> {
        return this.httpClient.get<ForumTopicoReplicaModel[]>(
            this.urlSelecionarManyForumTopicoReplicaByForumTopicoId + `/${forumTopicoId}`, 
            this.buildHttpOptions()
        );
    }

    inserirForumTopicoReplica(forumTopicoReplica: ForumTopicoReplicaModel): Observable<ForumTopicoReplicaModel> {
        return this.httpClient.post<ForumTopicoReplicaModel>(
            this.urlInserirForumTopicoReplica, 
            JSON.stringify(forumTopicoReplica), 
            this.buildHttpOptions()
        );
    }

    atualizarForumTopicoReplica(forumTopicoReplica: ForumTopicoReplicaModel): Observable<ForumTopicoReplicaModel> {
        return this.httpClient.put<ForumTopicoReplicaModel>(
            this.urlAtualizarForumTopicoReplica, 
            JSON.stringify(forumTopicoReplica), 
            this.buildHttpOptions()
        );
    }

    excluirForumTopicoReplica(forumTopicoReplicaId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirForumTopicoReplica + `/${forumTopicoReplicaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}