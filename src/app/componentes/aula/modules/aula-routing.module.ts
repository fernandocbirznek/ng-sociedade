import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    AulaResolver 
} from "../resolver";

import { 
    EditarAulaComponent,
    NovaAulaComponent 
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(aulaRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class AulaRoutingModule {}