import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    AdministradorHomeComponent,
} from "../features";

const administradorRoutes: Routes = [
    {
        path: "administrador-home/:email",
        component: AdministradorHomeComponent,
        canActivate: [AutenticacaoService],
        // resolve: {
        //     perfilProfessorResolver: PerfilProfessorResolver
        // }
    },
];

@NgModule({
    imports: [RouterModule.forChild(administradorRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AdministradorRoutingModule {}