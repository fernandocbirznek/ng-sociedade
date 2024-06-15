import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    AulaResolver 
} from "../resolver";

import { 
    EditarAulaComponent,
    NovaAulaComponent, 
    VisualizarAulaComponent
} from "../features";

const aulaRoutes: Routes = [
    {
        path: "cadastrar-aula",
        component: NovaAulaComponent,
        canActivate: [AutenticacaoService],
    },
    {
        path: "editar-aula/:id",
        component: EditarAulaComponent,
        canActivate: [AutenticacaoService],
        resolve: {
            aulaResolver: AulaResolver
        }
    },
    {
        path: "visualizar-aula/:id",
        component: VisualizarAulaComponent,
        resolve: {
            aulaResolver: AulaResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(aulaRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AulaRoutingModule {}