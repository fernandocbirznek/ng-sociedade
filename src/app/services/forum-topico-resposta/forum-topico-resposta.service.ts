import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTopicoRespostaModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoRespostaService {
    private readonly baseUrl = `${environment.forumApiUrl}/ForumTopicoResposta`;
    
    urlSelecionarManyForumTopicoRespostaByForumTopicoId = `${this.baseUrl}/selecionar-forum-topico-resposta'`;
    urlInserirForumTopicoResposta = `${this.baseUrl}/inserir`;
    urlAtualizarForumTopicoResposta = `${this.baseUrl}/atualizar`;
    urlExcluirForumTopicoResposta = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTopicoRespostaByForumTopicoId(forumTopicoId: number): Observable<ForumTopicoRespostaModel[]> {
        return this.httpClient.get<ForumTopicoRespostaModel[]>(
            this.urlSelecionarManyForumTopicoRespostaByForumTopicoId + `/${forumTopicoId}`, 
            this.buildHttpOptions()
        );
    }

    inserirForumTopicoResposta(forumTopicoResposta: ForumTopicoRespostaModel): Observable<ForumTopicoRespostaModel> {
        return this.httpClient.post<ForumTopicoRespostaModel>(
            this.urlInserirForumTopicoResposta, 
            JSON.stringify(forumTopicoResposta), 
            this.buildHttpOptions()
        );
    }

    atualizarForumTopicoResposta(forumTopicoResposta: ForumTopicoRespostaModel): Observable<ForumTopicoRespostaModel> {
        return this.httpClient.put<ForumTopicoRespostaModel>(
            this.urlAtualizarForumTopicoResposta, 
            JSON.stringify(forumTopicoResposta), 
            this.buildHttpOptions()
        );
    }

    excluirForumTopico(forumTopicoRespostaId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirForumTopicoResposta + `/${forumTopicoRespostaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}