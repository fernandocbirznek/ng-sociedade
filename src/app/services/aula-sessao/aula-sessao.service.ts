import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AulaSessaoModel,
    AulaSessaoOrdemRequestModel,
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AulaSessaoService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AulaSessao`;

    urlInserirAulaSessao = `${this.baseUrl}/inserir`;
    urlAtualizarAulaSessao = `${this.baseUrl}/atualizar`;
    urlAtualizarAulaSessaoOrdem = `${this.baseUrl}/atualizar-aula-sessao-ordem`;
    urlAtualizarAulaSessaoFavoritada = `${this.baseUrl}/atualizar-favoritada`;
    urlExcluirAulaSessao = `${this.baseUrl}/excluir`; 
    urlSelecionarManyAulaSessaoByAulaId = `${this.baseUrl}/selecionar-sessoes-aula`;
    urlSelecionarAulaSessaoById = `${this.baseUrl}/selecionar-aula-sessao`;

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

    atualizarAulaSessaoOrdem(item: AulaSessaoOrdemRequestModel): Observable<Date> {
        let aulaSessaoMany = JSON.stringify(item);
        return this.httpClient.put<Date>(this.urlAtualizarAulaSessaoOrdem, aulaSessaoMany, this.buildHttpOptions());
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