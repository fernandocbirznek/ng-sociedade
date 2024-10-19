import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    selecionarManyForumTopicoByForumId,
} from "../../../store";

@Injectable({
    providedIn: 'root'
})

export class ForumTopicoVisualizarResolver {

    constructor(
        public store: Store,
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<boolean>|Promise<boolean>|boolean {
        let id = route.paramMap.get('id');

        if (id) {
            this.store.dispatch(selecionarManyForumTopicoByForumId({ forumId: +id }));

            return true;
        }
        
        return false;
    }
}
