import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    PerfilProfessorResolver 
} from "../resolver";

import { 
    ProfessorHomeComponent, 
} from "../features";

const perfilProfessorRoutes: Routes = [
    {
        path: "perfil-professor/:email",
        component: ProfessorHomeComponent,
        canActivate: [AutenticacaoService],
        resolve: {
            perfilProfessorResolver: PerfilProfessorResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(perfilProfessorRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class PerfilProfessorRoutingModule {}