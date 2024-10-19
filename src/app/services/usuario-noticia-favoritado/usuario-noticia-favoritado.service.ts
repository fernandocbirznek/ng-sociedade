import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioNoticiaFavoritadoModel 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioNoticiaFavoritadoService {
    urlInserirUsuarioNoticiaFavoritado = 'https://localhost:44362/api/UsuarioNoticiaFavoritado/inserir';
    urlExcluirUsuarioNoticiaFavoritado = 'https://localhost:44362/api/UsuarioNoticiaFavoritado/excluir';
    urlSelecionarManyUsuarioNoticiaFavoritadoByUsuarioId = 'https://localhost:44362/api/UsuarioNoticiaFavoritado/selecionar-usuario-noticia-favoritado';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    inserirUsuarioNoticiaFavoritado(noticia: UsuarioNoticiaFavoritadoModel): Observable<UsuarioNoticiaFavoritadoModel> {
        return this.httpClient.post<UsuarioNoticiaFavoritadoModel>(this.urlInserirUsuarioNoticiaFavoritado, JSON.stringify(noticia), this.buildHttpOptions());
    }

    removerUsuarioNoticiaFavoritado(usuarioNoticiaFavoritado: UsuarioNoticiaFavoritadoModel): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirUsuarioNoticiaFavoritado + 
            `/${usuarioNoticiaFavoritado.id}/noticia/${usuarioNoticiaFavoritado.noticiaId}`);
    }

    selecionarManyUsuarioNoticiaFavoritadoByUsuarioId(usuarioId: number): Observable<UsuarioNoticiaFavoritadoModel[]> {
        return this.httpClient.get<UsuarioNoticiaFavoritadoModel[]>(this.urlSelecionarManyUsuarioNoticiaFavoritadoByUsuarioId + `/${usuarioId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}