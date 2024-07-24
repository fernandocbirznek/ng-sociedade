import { SafeHtml } from "@angular/platform-browser";
import { ForumTopicoRespostaViewModel } from "../forum-topico-resposta";
import { ForumTopicoReplicaModel } from "../forum-topico-replica";

export class ComentarioView {
    trustedHtml: SafeHtml = '';
    forumTopicoComentario: ForumTopicoRespostaViewModel = new ForumTopicoRespostaViewModel();
    forumTopicoReplicaComentario: ForumTopicoReplicaModel = new ForumTopicoReplicaModel();

    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;
}