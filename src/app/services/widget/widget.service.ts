import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    WidgetModel, 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class WidgetService {
    urlSelecionarWidgetCursarByUsuarioId = 'https://localhost:44303/api/WidgetCursar/selecionar-aulas-cursar';
    urlSelecionarWidgetCursandoByUsuarioId = 'https://localhost:44303/api/WidgetCursando/selecionar-aulas-cursando';
    urlSelecionarWidgetConcluidoByUsuarioId = 'https://localhost:44303/api/WidgetConcluido/selecionar-aulas-concluido';

    urlInserirWidgetConcluido = 'https://localhost:44303/api/WidgetConcluido/inserir';
    urlInserirWidgetCursando = 'https://localhost:44303/api/WidgetCursando/inserir';
    urlInserirWidgetCursar = 'https://localhost:44303/api/WidgetCursar/inserir';

    urlRemoverWidgetConcluido = 'https://localhost:44303/api/WidgetConcluido/excluir';
    urlRemoverWidgetCursando = 'https://localhost:44303/api/WidgetCursando/excluir';
    urlRemoverWidgetCursar = 'https://localhost:44303/api/WidgetCursar/excluir';

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