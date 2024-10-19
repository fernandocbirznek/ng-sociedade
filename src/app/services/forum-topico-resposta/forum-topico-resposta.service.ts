import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTopicoRespostaModel,
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoRespostaService {
    urlSelecionarManyForumTopicoRespostaByForumTopicoId = 'https://localhost:44361/api/ForumTopicoResposta/selecionar-forum-topico-resposta';
    urlInserirForumTopicoResposta = 'https://localhost:44361/api/ForumTopicoResposta/inserir';
    urlAtualizarForumTopicoResposta = 'https://localhost:44361/api/ForumTopicoResposta/atualizar';
    urlExcluirForumTopicoResposta = 'https://localhost:44361/api/ForumTopicoResposta/excluir';

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