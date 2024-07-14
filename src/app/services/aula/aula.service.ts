import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AdministradorHomeAulaInformacaoModel,
    AulaModel,
    AulaTagModel,
    AulaViewModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AulaService {
    urlInserirAula = 'https://localhost:44303/api/Aula/inserir';
    urlAtualizarAula = 'https://localhost:44303/api/Aula/atualizar';
    urlAtualizarAulaCurtir = 'https://localhost:44303/api/Aula/atualizar-curtir';
    urlAtualizarAulaFavoritada = 'https://localhost:44303/api/Aula/atualizar-favoritada';
    urlAtualizarAulaPosterior = 'https://localhost:44303/api/Aula/atualizar-aula-posterior';
    urlAtualizarAulaAnterior = 'https://localhost:44303/api/Aula/atualizar-aula-anterior';
    urlExcluirAula = 'https://localhost:44303/api/Aula/excluir';
    urlAtualizarAulaPublicado = 'https://localhost:44303/api/Aula/atualizar-publicado';
    urlSelecionarAulaById = 'https://localhost:44303/api/Aula/selecionar-aula';
    urlSelecionarManyAulaAreaFisica = 'https://localhost:44303/api/Aula/selecionar-aulas-area-fisica';
    urlSelecionarAulaByProfessorId = 'https://localhost:44303/api/Aula/selecionar-aulas-professor';
    urlSelecionarManyAula = 'https://localhost:44303/api/Aula/selecionar-aulas-sistema';

    urlInserirManyAulaTag = 'https://localhost:44303/api/AulaTag/inserir';
    urlExcluirAulaTag = 'https://localhost:44303/api/AulaTag/excluir';

    urlSelecionarAdministradorHomeAulaInformacao = 'https://localhost:44303/api/administrador-home/selecionar-aula-informacao';

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