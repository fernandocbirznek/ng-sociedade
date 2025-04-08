import { SafeHtml } from "@angular/platform-browser";
import { ForumTopicoRespostaViewModel } from "../forum-topico-resposta";
import { ForumTopicoReplicaModel } from "../forum-topico-replica";

export class ComentarioView {
    trustedHtml: SafeHtml = '';
    forumTopicoComentario: ForumTopicoRespostaViewModel = new ForumTopicoRespostaViewModel();
    forumTopicoReplicaComentario: ForumTopicoReplicaModel = ForumTopicoReplicaModel.create({});

    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;

    protected constructor(item?: Partial<ComentarioView>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ComentarioView>): ComentarioView {
        return new ComentarioView(item);
    }
}