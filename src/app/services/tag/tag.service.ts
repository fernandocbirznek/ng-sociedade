import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    TagModel,
} from "../../models";

import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TagService {
    private readonly baseUrl = `${environment.aulaApiUrl}/Tag`;
    urlInserirTag = `${this.baseUrl}/inserir`;
    urlExcluirTag = `${this.baseUrl}/excluir`;
    urlSelecionarManyTag = `${this.baseUrl}/selecionar-tag-sistema`;

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}
    inserirTag(tag: TagModel): Observable<TagModel> {
        return this.httpClient.post<TagModel>(this.urlInserirTag, JSON.stringify(tag), this.buildHttpOptions());
    }

    excluirTag(tagId: number): Observable<number> {
        return this.httpClient.delete<number>(this.urlExcluirTag + `/${tagId}`, this.buildHttpOptions());
    }

    selecionarManyTag(): Observable<TagModel[]> {
        return this.httpClient.get<TagModel[]>(this.urlSelecionarManyTag, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}