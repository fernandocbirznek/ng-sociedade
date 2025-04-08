import { ForumTopicoRespostaModel } from "./forum-topico-resposta.model";

export class ForumTopicoRespostaViewModel extends ForumTopicoRespostaModel {
    forumReplicaCount: number = 0;

    //TODO retirar da classe base
    // usuarioNome: string = '';
    // usuarioFoto: File | undefined = undefined;

    public constructor(item?: Partial<ForumTopicoRespostaViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<ForumTopicoRespostaViewModel>): ForumTopicoRespostaViewModel {
        return new ForumTopicoRespostaViewModel(item);
    }
}