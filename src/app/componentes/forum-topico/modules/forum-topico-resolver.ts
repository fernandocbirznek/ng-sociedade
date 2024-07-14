import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    selecionarManyForumTopicoByForumId,
    selecionarManyForumTopicoReplicaByForumTopicoId,
    selecionarManyForumTopicoRespostaByForumTopicoId,
} from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoResolver {

    constructor(
        public store: Store,
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let id = route.paramMap.get('id');
        let forumId = route.paramMap.get('forumId');

        if (id && forumId) {
            this.store.dispatch(selecionarManyForumTopicoReplicaByForumTopicoId({ forumTopicoId: +id }));
            this.store.dispatch(selecionarManyForumTopicoRespostaByForumTopicoId({ forumTopicoId: +id }));
            this.store.dispatch(selecionarManyForumTopicoByForumId({ forumId: +forumId }));
            return true;
        }
        
        return false;
    }
}
