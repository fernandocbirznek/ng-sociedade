import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    WidgetModel, 
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class WidgetService {
    private readonly widgetCursarUrl = `${environment.aulaApiUrl}/WidgetCursar`;
    private readonly widgetCursandoUrl = `${environment.aulaApiUrl}/WidgetCursando`;
    private readonly widgetConcluidoUrl = `${environment.aulaApiUrl}/WidgetConcluido`;

    urlSelecionarWidgetCursarByUsuarioId = `${this.widgetCursarUrl}/selecionar-aulas-cursar`;
    urlSelecionarWidgetCursandoByUsuarioId = `${this.widgetCursandoUrl}/selecionar-aulas-cursando`;
    urlSelecionarWidgetConcluidoByUsuarioId = `${this.widgetConcluidoUrl}/selecionar-aulas-concluido`;

    urlInserirWidgetConcluido = `${this.widgetConcluidoUrl}/inserir`;
    urlInserirWidgetCursando = `${this.widgetCursandoUrl}/inserir`;
    urlInserirWidgetCursar = `${this.widgetCursarUrl}/inserir`;

    urlRemoverWidgetConcluido = `${this.widgetConcluidoUrl}/excluir`;
    urlRemoverWidgetCursando = `${this.widgetCursandoUrl}/excluir`;
    urlRemoverWidgetCursar = `${this.widgetCursarUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarWidgetCursarByUsuarioId(usuarioId: number): Observable<WidgetModel[]> {
        return this.httpClient.get<WidgetModel[]>(this.urlSelecionarWidgetCursarByUsuarioId + `/${usuarioId}`);
    }

    selecionarWidgetCursandoByUsuarioId(usuarioId: number): Observable<WidgetModel[]> {
        return this.httpClient.get<WidgetModel[]>(this.urlSelecionarWidgetCursandoByUsuarioId + `/${usuarioId}`);
    }

    selecionarWidgetConcluidoByUsuarioId(usuarioId: number): Observable<WidgetModel[]> {
        return this.httpClient.get<WidgetModel[]>(this.urlSelecionarWidgetConcluidoByUsuarioId + `/${usuarioId}`);
    }

    inserirWidgetConcluido(widgetConcluido: WidgetModel): Observable<WidgetModel> {
        return this.httpClient.post<WidgetModel>(
            this.urlInserirWidgetConcluido, 
            JSON.stringify(widgetConcluido), 
            this.buildHttpOptions()
        );
    }

    inserirWidgetCursando(widgetCursando: WidgetModel): Observable<WidgetModel> {
        return this.httpClient.post<WidgetModel>(
            this.urlInserirWidgetCursando, 
            JSON.stringify(widgetCursando), 
            this.buildHttpOptions()
        );
    }

    inserirWidgetCursar(widgetCursar: WidgetModel): Observable<WidgetModel> {
        return this.httpClient.post<WidgetModel>(
            this.urlInserirWidgetCursar, 
            JSON.stringify(widgetCursar), 
            this.buildHttpOptions()
        );
    }

    removerWidgetConcluido(widgetConcluidoId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverWidgetConcluido + `/${widgetConcluidoId}`);
    }

    removerWidgetCursando(widgetCursandoId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverWidgetCursando + `/${widgetCursandoId}`);
    }

    removerWidgetCursar(widgetCursarId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverWidgetCursar + `/${widgetCursarId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}