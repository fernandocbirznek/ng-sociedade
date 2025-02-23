import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioPerfilModel, 
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioPerfilService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/UsuarioPerfil`;

    urlAlterarUsuarioPerfil = `${this.baseUrl}/atualizar`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    atualizarUsuarioPerfil(usuarioPerfil: UsuarioPerfilModel): Observable<Date> {
        return this.httpClient.put<Date>(
            this.urlAlterarUsuarioPerfil, 
            JSON.stringify(usuarioPerfil), 
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