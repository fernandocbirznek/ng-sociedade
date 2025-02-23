import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioAreaInteresseModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioAreaInteresseService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/UsuarioAreaInteresse`;

    urlInserirUsuarioAreaInteresse = `${this.baseUrl}/inserir`;
    urlRemoverUsuarioAreaInteresse = `${this.baseUrl}/excluir`;
    
    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    inserirUsuarioAreaInteresse(usuarioAreaInteresse: UsuarioAreaInteresseModel): Observable<UsuarioAreaInteresseModel> {
        return this.httpClient.post<UsuarioAreaInteresseModel>(
            this.urlInserirUsuarioAreaInteresse, 
            JSON.stringify(usuarioAreaInteresse), 
            this.buildHttpOptions()
        );
    }

    removerUsuarioAreaInteresse(usuarioAreaInteresse: UsuarioAreaInteresseModel): Observable<UsuarioAreaInteresseModel> {
        return this.httpClient.delete<UsuarioAreaInteresseModel>(
            this.urlRemoverUsuarioAreaInteresse + `/${usuarioAreaInteresse.usuarioId}/${usuarioAreaInteresse.areaInteresseId}`
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