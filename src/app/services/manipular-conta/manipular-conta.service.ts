import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    CriarContaPerfilModel, 
    DeletarConta, 
    Login, 
    UsuarioModel
} from "../../models";

import { getOneUsuarioLogado } from "../../store";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ManipularContaService {
    private readonly baseUrl = `${environment.usuarioApiUrl}/Usuario`;

    urlCriarConta = `${this.baseUrl}/inserir`;
    urlLoginConta = `${this.baseUrl}/login`;
    urlLoginAutomaticoWhitToken = `${this.baseUrl}/login-automatico`;
    //TODO, ta errado, precisa configurar
    urlDeletarConta = `${this.baseUrl}/deletarConta`;
    
    usuariologado$: Observable<any>;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {
        this.usuariologado$ = this.store.select(getOneUsuarioLogado);
    }

    criarConta(criarConta: CriarContaPerfilModel): Observable<UsuarioModel> {
        return this.httpClient.post<UsuarioModel>(this.urlCriarConta, JSON.stringify(criarConta), this.buildHttpOptions());
    }

    loginConta(loginConta: Login): Observable<UsuarioModel> {
        return this.httpClient.post<UsuarioModel>(this.urlLoginConta, JSON.stringify(loginConta), this.buildHttpOptions());
    }
    

    loginAutomaticoWhitToken(token: string): Observable<UsuarioModel> {
        return this.httpClient.post<UsuarioModel>(this.urlLoginAutomaticoWhitToken, JSON.stringify({token: token }), this.buildHttpOptions());
    }

    //TODO, ta errado precisa configurar
    deletarConta(deletarConta: DeletarConta): Observable<any> {
        return this.httpClient.delete(this.urlDeletarConta + `/${deletarConta}`, this.buildHttpOptionsToken());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }

    private buildHttpOptionsToken() {
        let token: string | undefined = this.pegarToken();
        return {
            headers: new HttpHeaders()   
                .set('Content-Type', 'application/json')
                .set('x-access-token', `${token}`)
        }
    }

    private pegarToken(): string | undefined {
        let token: string | undefined = undefined;
        this.usuariologado$.subscribe(item => {
            token = item.token;
        }).unsubscribe();
        return token;
    }
}