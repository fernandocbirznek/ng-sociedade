import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AdministradorHomeAulaInformacaoModel,
    AulaModel,
    AulaTagModel,
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
    inserirAula(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.post<AulaModel>(this.urlInserirAula, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAula(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAula, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaCurtir(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAulaCurtir, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaFavoritada(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAulaFavoritada, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaPosterior(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAulaPosterior, JSON.stringify(aula), this.buildHttpOptions());
    }

    atualizarAulaAnterior(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAulaAnterior, JSON.stringify(aula), this.buildHttpOptions());
    }

    excluirAula(aulaId: number): Observable<AulaModel> {
        return this.httpClient.delete<AulaModel>(this.urlExcluirAula + `/${aulaId}`, this.buildHttpOptions());
    }

    atualizarAulaPublicado(aula: AulaModel): Observable<AulaModel> {
        return this.httpClient.put<AulaModel>(this.urlAtualizarAulaPublicado, JSON.stringify(aula), this.buildHttpOptions());
    }

    selecionarManyAulaByAreaFisicaId(aulaFisicaId: number): Observable<AulaModel[]> {
        return this.httpClient.get<AulaModel[]>(this.urlSelecionarManyAulaAreaFisica + `/${aulaFisicaId}`, this.buildHttpOptions());
    }

    selecionarOneAulaById(aulaId: number): Observable<AulaModel> {
        return this.httpClient.get<AulaModel>(this.urlSelecionarAulaById + `/${aulaId}`, this.buildHttpOptions());
    }

    selecionarManyAulaByProfessorId(professorId: number): Observable<AulaModel[]> {
        return this.httpClient.get<AulaModel[]>(this.urlSelecionarAulaByProfessorId + `/${professorId}`, this.buildHttpOptions());
    }

    selecionarManyAula(): Observable<AulaModel[]> {
        return this.httpClient.get<AulaModel[]>(this.urlSelecionarManyAula, this.buildHttpOptions());
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