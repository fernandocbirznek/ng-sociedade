import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UsuarioModel } from "src/app/models";

import { 
    AppState, 
    getOneUsuarioLogado 
} from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService implements CanActivate {

    usuarioLogado$: Observable<UsuarioModel> = new Observable<UsuarioModel>();

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {
        this.usuarioLogado$ = this.store.select(getOneUsuarioLogado);
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.usuarioLogado$.subscribe(item => {
            if(item.token == "") {
                this.router.navigate([""]);
            } 
        }).unsubscribe();
        return true;
    }
}
