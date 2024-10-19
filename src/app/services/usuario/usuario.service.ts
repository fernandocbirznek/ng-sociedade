import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioModel, 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    urlSelecionarUsuarioById = 'https://localhost:44362/api/Usuario/selecionar-usuario';
    urlSelecionarManyUsuario = 'https://localhost:44362/api/Usuario/selecionar-usuarios';
    urlAtualizarUsuario = 'https://localhost:44362/api/Usuario/atualizar';
    urlExcluirUsuario = 'https://localhost:44362/api/Usuario/excluir';
    
    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarUsuarioById(usuarioId: number): Observable<UsuarioModel> {
        return this.httpClient.get<UsuarioModel>(this.urlSelecionarUsuarioById + `/${usuarioId}`);
    }

    selecionarManyUsuario(): Observable<UsuarioModel[]> {
        return this.httpClient.get<UsuarioModel[]>(this.urlSelecionarManyUsuario);
    }

    atualizarUsuario(usuario: UsuarioModel): Observable<Date> {
        return this.httpClient.put<Date>(this.urlAtualizarUsuario, JSON.stringify(usuario), this.buildHttpOptions());
    }

    excluirUsuario(usuarioId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirUsuario + `/${usuarioId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}