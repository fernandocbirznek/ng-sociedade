import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AulaComentarioModel,
    AulaComentarioViewModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AulaComentarioService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AulaComentario`;
    urlInserirAulaComentario = `${this.baseUrl}/inserir`;
    urlAtualizarAulaComentario = `${this.baseUrl}/atualizar`;
    urlExcluirAulaComentario = `${this.baseUrl}/excluir`;
    urlSelecionarManyAulaComentarioByAulaId = `${this.baseUrl}/selecionar-aula-comentario`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}
    inserirAulaComentario(aulaComentario: AulaComentarioModel): Observable<AulaComentarioModel> {
        return this.httpClient.post<AulaComentarioModel>(
            this.urlInserirAulaComentario, 
            JSON.stringify(aulaComentario), 
            this.buildHttpOptions()
        );
    }

    atualizarAulaComentario(aulaComentario: AulaComentarioModel): Observable<AulaComentarioModel> {
        return this.httpClient.put<AulaComentarioModel>(
            this.urlAtualizarAulaComentario, 
            JSON.stringify(aulaComentario), 
            this.buildHttpOptions()
        );
    }

    excluirAulaComentario(aulaComentarioId: number): Observable<number> {
        return this.httpClient.delete<number>(
            this.urlExcluirAulaComentario + `/${aulaComentarioId}`, 
            this.buildHttpOptions()
        );
    }

    selecionarManyAulaComentarioByAulaId(aulaId: number): Observable<AulaComentarioViewModel[]> {
        return this.httpClient.get<AulaComentarioViewModel[]>(
            this.urlSelecionarManyAulaComentarioByAulaId + `/${aulaId}`, 
            this.buildHttpOptions()
        );
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}