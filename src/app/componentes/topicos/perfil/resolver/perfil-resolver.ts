import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class PerfilResolver {

    constructor(){}

    resolve(route: ActivatedRouteSnapshot): boolean {
        return true;
    }
}
