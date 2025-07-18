import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AtualizarManyAulaSessaoFavoritadaCommand,
    UsuarioAulaSessaoFavoritadoModel, 
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAulaSessaoFavoritadoService {
    private readonly baseUrl = `${environment.aulaApiUrl}/AulaSessaoFavoritada`;
    urlSelecionarManyAulaSessaoFavoritadoByUsuarioId = `${this.baseUrl}/selecionar-many-aula-sessao-favoritado`;
    urlInserirUsuarioAulaSessaoFavoritado = `${this.baseUrl}/inserir`;
    urlAtualizarUsuarioAulaSessaoFavoritado = `${this.baseUrl}/atualizar`;
    urlRemoverUsuarioAulaSessaoFavoritado = `${this.baseUrl}/excluir`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyAulaSessaoFavoritadoByUsuarioId(usuarioId: number): Observable<UsuarioAulaSessaoFavoritadoModel[]> {
        return this.httpClient.get<UsuarioAulaSessaoFavoritadoModel[]>(this.urlSelecionarManyAulaSessaoFavoritadoByUsuarioId + `/${usuarioId}`);
    }

    inserirUsuarioAulaSessaoFavoritado(usuarioAulaSessaoFavoritado: UsuarioAulaSessaoFavoritadoModel): Observable<UsuarioAulaSessaoFavoritadoModel> {
        return this.httpClient.post<UsuarioAulaSessaoFavoritadoModel>(
            this.urlInserirUsuarioAulaSessaoFavoritado, 
            JSON.stringify(usuarioAulaSessaoFavoritado), 
            this.buildHttpOptions()
        );
    }

    atualizarUsuarioAulaSessaoFavoritado(itens: AtualizarManyAulaSessaoFavoritadaCommand[]): Observable<UsuarioAulaSessaoFavoritadoModel> {
        return this.httpClient.put<UsuarioAulaSessaoFavoritadoModel>(
            this.urlAtualizarUsuarioAulaSessaoFavoritado, 
            JSON.stringify({ aulaSessaoFavoritadaMany: itens }), 
            this.buildHttpOptions()
        );
    }

    removerUsuarioAulaSessaoFavoritado(aulaSessaoId: number, usuarioId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlRemoverUsuarioAulaSessaoFavoritado + `/${usuarioId}` + `/${aulaSessaoId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}