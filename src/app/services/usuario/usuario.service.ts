import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioModel, 
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/Usuario`;

    urlSelecionarUsuarioById = `${this.baseUrl}/selecionar-usuario`;
    urlSelecionarManyUsuario = `${this.baseUrl}/selecionar-usuarios`;
    urlAtualizarUsuario = `${this.baseUrl}/atualizar`;
    urlExcluirUsuario = `${this.baseUrl}/excluir`;
        
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