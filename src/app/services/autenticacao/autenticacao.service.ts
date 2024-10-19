import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { 
    UsuarioModel 
} from "../../models";

import { 
    AppState, 
    getOneUsuarioLogado, 
    removerRota
} from "../../store";

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService  {

    usuarioLogado$: Observable<UsuarioModel | undefined> = new Observable<UsuarioModel | undefined>();

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
            if(item && item.token == "") {
                this.router.navigate([""]);
                this.store.dispatch(removerRota({ 
                    rota: {
                      rotaNome: '', 
                      rotaAcessar: ``,
                      rotaNivel: 1
                    } 
                  }));
            } 
        }).unsubscribe();
        return true;
    }
}
