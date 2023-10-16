import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";
import { PerfilComponent } from "../perfil.component";
import { PerfilResolver } from "../resolver";

const perfilRoutes: Routes = [
    {
        path: "perfil/:email",
        component:PerfilComponent,
        canActivate: [AutenticacaoService],
        resolve: {
            perfilResolver: PerfilResolver
        }
    }
];

@NgModule({
    imports:  [RouterModule.forChild(perfilRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class PerfilRoutingModule {}