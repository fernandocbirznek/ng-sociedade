import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { 
    AutenticacaoService 
} from "../../../services";

import { 
    ForumTopicoComponent,
    VisualizarForumTopicoComponent,
} from "../features";

import { ForumTopicoResolver } from "./forum-topico-resolver";
import { ForumTopicoVisualizarResolver } from "./forum-topico-visualizar.resolver";

const forumTopicoRoutes: Routes = [
    {
        path: "forum/:id/forum-topico",
        component: ForumTopicoComponent,
        resolve: {
            forumTopicoResolver: ForumTopicoVisualizarResolver
        }
    },
    {
        path: "forum/:forumId/forum-topico/:id",
        component: VisualizarForumTopicoComponent,
        resolve: {
            forumTopicoResolverVisualizar: ForumTopicoResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(forumTopicoRoutes)],
    exports: [RouterModule],
    providers: [AutenticacaoService],
})
export class ForumTopicoRoutingModule {}