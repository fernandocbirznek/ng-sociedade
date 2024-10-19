import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioAulaSessaoFavoritadoModel, 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAulaSessaoFavoritadoService {
    urlSelecionarManyAulaSessaoFavoritadoByUsuarioId = 'https://localhost:44303/api/AulaSessaoFavoritada/selecionar-many-aula-sessao-favoritado';
    urlInserirUsuarioAulaSessaoFavoritado = 'https://localhost:44303/api/AulaSessaoFavoritada/inserir';
    urlRemoverUsuarioAulaSessaoFavoritado = 'https://localhost:44303/api/AulaSessaoFavoritada/excluir';

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