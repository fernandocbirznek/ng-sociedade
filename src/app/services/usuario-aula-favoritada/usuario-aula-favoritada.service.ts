import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioAulaFavoritadaModel, 
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAulaFavoritadaService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AulaFavoritada`;
    urlSelecionarManyAulaFavoritadaByUsuarioId = `${this.baseUrl}/selecionar-aulas-favoritadas`;
    urlInserirUsuarioAulaFavoritada = `${this.baseUrl}/inserir`;
    urlRemoverUsuarioAulaFavoritada = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyAulaFavoritadaByUsuarioId(usuarioId: number): Observable<UsuarioAulaFavoritadaModel[]> {
        return this.httpClient.get<UsuarioAulaFavoritadaModel[]>(this.urlSelecionarManyAulaFavoritadaByUsuarioId + `/${usuarioId}`);
    }

    inserirUsuarioAulaFavoritada(usuarioAulaFavoritada: UsuarioAulaFavoritadaModel): Observable<UsuarioAulaFavoritadaModel> {
        return this.httpClient.post<UsuarioAulaFavoritadaModel>(
            this.urlInserirUsuarioAulaFavoritada, 
            JSON.stringify(usuarioAulaFavoritada), 
            this.buildHttpOptions()
        );
    }

    removerUsuarioAulaFavoritada(usuarioAulaFavoritadaId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverUsuarioAulaFavoritada + `/${usuarioAulaFavoritadaId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}