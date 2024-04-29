import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class ForumService {
    urlSelecionarManyForum = 'https://localhost:44361/api/Forum/selecionar-forum-sistema';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForum(): Observable<ForumModel[]> {
        return this.httpClient.get<ForumModel[]>(this.urlSelecionarManyForum, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}