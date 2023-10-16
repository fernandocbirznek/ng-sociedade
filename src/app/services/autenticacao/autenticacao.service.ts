import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState, selecionarManipularConta } from "src/app/store";

@Injectable({
    providedIn: 'root'
})

export class AutenticacaoService implements CanActivate {

    contaLogada$: Observable<any> = new Observable<any>();

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {
        this.contaLogada$ = this.store.select(selecionarManipularConta);
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.contaLogada$.subscribe(item => {
            if(item.token == "") {
                this.router.navigate([""]);
            } 
        }).unsubscribe();
        return true;
    }
}
