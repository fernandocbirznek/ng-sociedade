import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoService } from "src/app/services";

import { 
    ForumTopicoComponent,
    VisualizarForumTopicoComponent,
} from "../features";

const forumTopicoRoutes: Routes = [
    {
        path: "forum-topico/:id",
        component: ForumTopicoComponent,
        //canActivate: [AutenticacaoService],
        // resolve: {
        //     perfilProfessorResolver: PerfilProfessorResolver
        // }
    },
    {
        path: "visualizar-forum-topico/:id",
        component: VisualizarForumTopicoComponent,
        //canActivate: [AutenticacaoService],
        // resolve: {
        //     perfilProfessorResolver: PerfilProfessorResolver
        // }
    },
];

@NgModule({
    imports: [RouterModule.forChild(forumTopicoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class ForumTopicoRoutingModule {}