import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    PerfilProfessorResolver 
} from "../resolver";

import { 
    ProfessorEditarAulaComponent,
    ProfessorHomeComponent, 
    ProfessorNovaAulaComponent 
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
    {
        path: "cadastrar-aula",
        component: ProfessorNovaAulaComponent,
        canActivate: [AutenticacaoService],
    },
    {
        path: "editar-aula/:id",
        component: ProfessorEditarAulaComponent,
        canActivate: [AutenticacaoService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(perfilProfessorRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class PerfilProfessorRoutingModule {}