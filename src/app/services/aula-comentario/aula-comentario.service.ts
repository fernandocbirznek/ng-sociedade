import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AulaComentarioModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AulaComentarioService {
    urlInserirAulaComentario = 'https://localhost:44303/api/AulaComentario/inserir';
    urlAtualizarAulaComentario = 'https://localhost:44303/api/AulaComentario/atualizar';
    urlExcluirAulaComentario = 'https://localhost:44303/api/AulaComentario/excluir';
    urlSelecionarManyAulaComentarioByAulaId = 'https://localhost:44303/api/AulaComentario/selecionar-aula-comentario';

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

    selecionarManyAulaComentarioByAulaId(aulaId: number): Observable<AulaComentarioModel[]> {
        return this.httpClient.get<AulaComentarioModel[]>(
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