import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    AlunoHomeComponent,
} from "../features";

const alunoRoutes: Routes = [
    {
        path: "aluno-home/:email",
        component: AlunoHomeComponent,
        canActivate: [AutenticacaoService],
        // resolve: {
        //     perfilProfessorResolver: PerfilProfessorResolver
        // }
    },
];

@NgModule({
    imports: [RouterModule.forChild(alunoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AlunoRoutingModule {}