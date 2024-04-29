import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    ForumTagModel,
} from "src/app/models";

@Injectable({
    providedIn: 'root'
})

export class ForumTagService {
    urlSelecionarManyForumTag = 'https://localhost:44361/api/ForumTag/selecionar-forum-tag-sistema';

    constructor(
        private httpClient: HttpClient,
        public store: Store
    ) {}

    selecionarManyForumTag(): Observable<ForumTagModel[]> {
        return this.httpClient.get<ForumTagModel[]>(this.urlSelecionarManyForumTag, this.buildHttpOptions());
    }

    private buildHttpOptions() {
        return {
            headers: new HttpHeaders({})   
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Origin', '*')
        }
    }
}