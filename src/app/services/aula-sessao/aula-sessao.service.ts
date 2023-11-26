import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AulaSessaoModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AulaSessaoService {
    urlInserirAulaSessao = 'https://localhost:44303/api/AulaSessao/inserir';
    urlAtualizarAulaSessao = 'https://localhost:44303/api/AulaSessao/atualizar';
    urlAtualizarAulaSessaoFavoritada = 'https://localhost:44303/api/AulaSessao/atualizar-favoritada';
    urlExcluirAulaSessao = 'https://localhost:44303/api/AulaSessao/excluir';
    urlSelecionarManyAulaSessaoByAulaId = 'https://localhost:44303/api/AulaSessao/selecionar-sessoes-aula';
    urlSelecionarAulaSessaoById = 'https://localhost:44303/api/AulaSessao/selecionar-aula-sessao';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    inserirAulaSessao(aulaSessao: AulaSessaoModel): Observable<AulaSessaoModel> {
        return this.httpClient.post<AulaSessaoModel>(this.urlInserirAulaSessao, JSON.stringify(aulaSessao), this.buildHttpOptions());
    }

    atualizarAulaSessao(aulaSessao: AulaSessaoModel): Observable<AulaSessaoModel> {
        return this.httpClient.put<AulaSessaoModel>(this.urlAtualizarAulaSessao, JSON.stringify(aulaSessao), this.buildHttpOptions());
    }

    atualizarAulaSessaoFavoritada(aulaSessao: AulaSessaoModel): Observable<AulaSessaoModel> {
        return this.httpClient.put<AulaSessaoModel>(this.urlAtualizarAulaSessaoFavoritada, JSON.stringify(aulaSessao), this.buildHttpOptions());
    }

    excluirAulaSessao(aulaSessaoId: number): Observable<AulaSessaoModel> {
        return this.httpClient.delete<AulaSessaoModel>(this.urlExcluirAulaSessao + `/${aulaSessaoId}`, this.buildHttpOptions());
    }

    selecionarManyAulaSessaoByAulaId(aulaId: number): Observable<AulaSessaoModel[]> {
        return this.httpClient.get<AulaSessaoModel[]>(this.urlSelecionarManyAulaSessaoByAulaId + `/${aulaId}`, this.buildHttpOptions());
    }

    selecionarOneAulaSessaoById(aulaSessaoId: number): Observable<AulaSessaoModel> {
        return this.httpClient.get<AulaSessaoModel>(this.urlSelecionarAulaSessaoById + `/${aulaSessaoId}`, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}