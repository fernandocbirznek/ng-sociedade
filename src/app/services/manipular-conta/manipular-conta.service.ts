import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CriarConta, DeletarConta, Login } from "src/app/models";
import { selecionarManipularConta } from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class ManipularContaService {
    urlCriarConta = 'http://localhost:3000/criarConta/criarNovaConta';
    urlLoginConta = 'https://localhost:44362/api/Usuario/login';
    urlDeletarConta = 'http://localhost:3000/criarConta/deletarConta';

    loginConta$: Observable<any>;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {
        this.loginConta$ = this.store.select(selecionarManipularConta);
    }

    criarConta(criarConta: CriarConta): Observable<CriarConta> {
        return this.httpClient.post<CriarConta>(this.urlCriarConta, JSON.stringify(criarConta), this.buildHttpOptions());
    }

    loginConta(loginConta: Login): Observable<Login> {
        return this.httpClient.post<Login>(this.urlLoginConta, JSON.stringify(loginConta), this.buildHttpOptions());
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
        this.loginConta$.subscribe(item => {
            token = item.token;
        }).unsubscribe();
        return token;
    }
}