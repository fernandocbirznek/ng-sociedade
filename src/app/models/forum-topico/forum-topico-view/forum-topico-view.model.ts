import { ForumTopicoModel } from "../forum-topico.model";

export class ForumTopicoViewModel extends ForumTopicoModel {
    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;
    
    forumTopicoEnumNome: string = '';

    topicoRespostaCount: number = 0;
}