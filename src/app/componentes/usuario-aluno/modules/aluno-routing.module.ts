import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    AlunoHomeComponent,
} from "../features";

import { UsuarioAlunoResolver } from "./usuario-aluno.resolver";

const alunoRoutes: Routes = [
    {
        path: "aluno-home/:email/:id",
        component: AlunoHomeComponent,
        canActivate: [AutenticacaoService],
        resolve: {
            usuarioALunoResolver: UsuarioAlunoResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(alunoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AlunoRoutingModule {}