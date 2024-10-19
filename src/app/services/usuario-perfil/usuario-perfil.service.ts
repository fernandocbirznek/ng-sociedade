import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioPerfilModel, 
} from "../../models";

@Injectable({
    providedIn: 'root'
})

export class UsuarioPerfilService {
    urlAlterarUsuarioPerfil = 'https://localhost:44362/api/UsuarioPerfil/atualizar';

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