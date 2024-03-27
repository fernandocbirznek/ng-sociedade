import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioModel, 
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    urlSelecionarUsuarioById = 'https://localhost:44362/api/Usuario/selecionar-usuario';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarUsuarioById(usuarioId: number): Observable<UsuarioModel> {
        return this.httpClient.get<UsuarioModel>(this.urlSelecionarUsuarioById + `/${usuarioId}`);
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}