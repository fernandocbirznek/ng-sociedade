import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    PainelNoticiaComponent,
} from "../features";

const noticiaRoutes: Routes = [
    {
        path: "painel-noticia",
        component: PainelNoticiaComponent,
        //canActivate: [AutenticacaoService],
        // resolve: {
        //     perfilProfessorResolver: PerfilProfessorResolver
        // }
    },
];

@NgModule({
    imports: [RouterModule.forChild(noticiaRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class NoticiaRoutingModule {}