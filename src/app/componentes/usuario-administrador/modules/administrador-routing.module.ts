import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { 
    AutenticacaoService 
} from "../../../services";

import { 
    AdministradorHomeComponent,
} from "../features";

import { AdministradorResolver } from "./administrador.resolver";

const administradorRoutes: Routes = [
    {
        path: "administrador-home/:email/:id",
        component: AdministradorHomeComponent,
        canActivate: [AutenticacaoService],
        resolve: {
            administradorResolver: AdministradorResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(administradorRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AdministradorRoutingModule {}