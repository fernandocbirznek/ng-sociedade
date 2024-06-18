import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { MecanicaComponent } from "../mecanica";

import { TopicoResolver } from ".";


const topicoRoutes: Routes = [
    {
        path: "mecanica/:areaFisicaId",
        component: MecanicaComponent,
        resolve: {
            topicoResolver: TopicoResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(topicoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class TopicoRoutingModule {}