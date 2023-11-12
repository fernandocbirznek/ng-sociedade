import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    AulaModel,
    NoticiaModel, 
    NoticiaRequestModel 
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class AulaService {
    urlInserirAula = 'https://localhost:44303/api/Aula/inserir';
    urlAtualizarAula = 'https://localhost:44303/api/Atualizar/atualizar';
    urlAtualizarAulaCurtir = 'https://localhost:44303/api/Atualizar/atualizar-curtir';
    urlAtualizarAulaFavoritada = 'https://localhost:44303/api/Atualizar/atualizar-favoritada';
    urlExcluirAula = 'https://localhost:44303/api/Aula/excluir';
    urlSelecionarAulaById = 'https://localhost:44303/api/Aula/selecionar-aula';
    urlSelecionarManyAulaAreaFisica = 'https://localhost:44303/api/Aula/selecionar-aulas-area-fisica';
    urlSelecionarAulaByProfessorId = 'https://localhost:44303/api/Aula/selecionar-aulas-professor';

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

    excluirAula(aulaId: number): Observable<AulaModel> {
        return this.httpClient.delete<AulaModel>(this.urlExcluirAula + `/${aulaId}`, this.buildHttpOptions());
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

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}