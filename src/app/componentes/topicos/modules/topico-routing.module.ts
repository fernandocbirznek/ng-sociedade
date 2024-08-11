import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { MecanicaComponent } from "../features/mecanica";

import { TopicoResolver } from ".";
import { PerfilComponent } from "../features";


const topicoRoutes: Routes = [
    {
        path: "mecanica/:areaFisicaId",
        component: MecanicaComponent,
        resolve: {
            topicoResolver: TopicoResolver
        }
    },
    {
        path: "perfil/:email",
        component:PerfilComponent,
        canActivate: [AutenticacaoService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(topicoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class TopicoRoutingModule {}