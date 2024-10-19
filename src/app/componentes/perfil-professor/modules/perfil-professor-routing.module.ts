import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "../../../services";

import { 
    ProfessorHomeComponent, 
} from "../features";

import { PerfilProfessorResolver } from "./perfil-professor.resolve";

const perfilProfessorRoutes: Routes = [
    {
        path: "perfil-professor/:email/:id",
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