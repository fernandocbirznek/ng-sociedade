import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AdministradorHomeAulaInformacaoModel,
    AulaTagModel,
    AulaViewModel,
} from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AulaService {
    private readonly baseUrl = `${environment.aulaApiUrl}/Aula`;
    private readonly aulaTagUrl = `${environment.aulaApiUrl}/AulaTag`;
    private readonly aulaAdministradorHomeUrl = `${environment.aulaApiUrl}/administrador-home`;
    
    urlInserirAula = `${this.baseUrl}/inserir`;
    urlAtualizarAula = `${this.baseUrl}/atualizar`;
    urlAtualizarAulaCurtir = `${this.baseUrl}/atualizar-curtir`;
    urlAtualizarAulaFavoritada = `${this.baseUrl}/atualizar-favoritada`;
    urlAtualizarAulaPosterior = `${this.baseUrl}/atualizar-aula-posterior`;
    urlAtualizarAulaAnterior = `${this.baseUrl}/atualizar-aula-anterior`;
    urlExcluirAula = `${this.baseUrl}/excluir`;
    urlAtualizarAulaPublicado = `${this.baseUrl}/atualizar-publicado`;
    urlSelecionarAulaById = `${this.baseUrl}/selecionar-aula`;
    urlSelecionarManyAulaAreaFisica = `${this.baseUrl}/selecionar-aulas-area-fisica`;
    urlSelecionarAulaByProfessorId = `${this.baseUrl}/selecionar-aulas-professor`;
    urlSelecionarManyAula = `${this.baseUrl}/selecionar-aulas-sistema`;

    urlInserirManyAulaTag = `${this.aulaTagUrl}/inserir`;
    urlExcluirAulaTag = `${this.aulaTagUrl}/excluir`;

    urlSelecionarAdministradorHomeAulaInformacao = `${this.aulaAdministradorHomeUrl}/selecionar-aula-informacao`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}
    inserirAula(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.post<AulaViewModel>(this.urlInserirAula, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAula(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAula, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaCurtir(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAulaCurtir, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaFavoritada(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAulaFavoritada, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaPosterior(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAulaPosterior, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaAnterior(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAulaAnterior, JSON.stringify(aula), this.buildHttpOptions());
    }

    excluirAula(aulaId: number): Observable<AulaViewModel> {
        return this.httpClient.delete<AulaViewModel>(this.urlExcluirAula + `/${aulaId}`, this.buildHttpOptions());
    }

    atualizarAulaPublicado(aula: AulaViewModel): Observable<AulaViewModel> {
        return this.httpClient.put<AulaViewModel>(this.urlAtualizarAulaPublicado, JSON.stringify(aula), this.buildHttpOptions());
    }

    selecionarManyAulaByAreaFisicaId(aulaFisicaId: number): Observable<AulaViewModel[]> {
        return this.httpClient.get<AulaViewModel[]>(this.urlSelecionarManyAulaAreaFisica + `/${aulaFisicaId}`, this.buildHttpOptions());
    }

    selecionarOneAulaById(aulaId: number): Observable<AulaViewModel> {
        return this.httpClient.get<AulaViewModel>(this.urlSelecionarAulaById + `/${aulaId}`, this.buildHttpOptions());
    }

    selecionarManyAulaByProfessorId(professorId: number): Observable<AulaViewModel[]> {
        return this.httpClient.get<AulaViewModel[]>(this.urlSelecionarAulaByProfessorId + `/${professorId}`, this.buildHttpOptions());
    }

    selecionarManyAula(): Observable<AulaViewModel[]> {
        return this.httpClient.get<AulaViewModel[]>(this.urlSelecionarManyAula, this.buildHttpOptions());
    }


    inserirManyAulaTag(aulaTagMany: AulaTagModel[]): Observable<AulaTagModel[]> {
        return this.httpClient.post<AulaTagModel[]>(this.urlInserirManyAulaTag, JSON.stringify(aulaTagMany), this.buildHttpOptions());
    }

    excluirAulaTag(aulaTagId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirAulaTag + `/${aulaTagId}`, this.buildHttpOptions());
    }


    selecionarAdministradorHomeAulaInformacao(): Observable<AdministradorHomeAulaInformacaoModel> {
        return this.httpClient.get<AdministradorHomeAulaInformacaoModel>(this.urlSelecionarAdministradorHomeAulaInformacao, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}