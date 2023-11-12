import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    CriarConta, 
    CriarContaPerfilModel, 
    DeletarConta, 
    Login, 
    UsuarioModel
} from "src/app/models";

import { getOneUsuarioLogado } from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class ManipularContaService {
    urlCriarConta = 'https://localhost:44362/api/Usuario/inserir';
    urlLoginConta = 'https://localhost:44362/api/Usuario/login';
    urlDeletarConta = 'http://localhost:3000/criarConta/deletarConta';

    usuariologado$: Observable<any>;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {
        this.usuariologado$ = this.store.select(getOneUsuarioLogado);
    }

    criarConta(criarConta: CriarContaPerfilModel): Observable<CriarConta> {
        return this.httpClient.post<CriarContaPerfilModel>(this.urlCriarConta, JSON.stringify(criarConta), this.buildHttpOptions());
    }

    loginConta(loginConta: Login): Observable<UsuarioModel> {
        return this.httpClient.post<UsuarioModel>(this.urlLoginConta, JSON.stringify(loginConta), this.buildHttpOptions());
    }

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