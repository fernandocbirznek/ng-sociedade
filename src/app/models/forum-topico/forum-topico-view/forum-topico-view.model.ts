import { ForumTopicoModel } from "../forum-topico.model";

export class ForumTopicoViewModel extends ForumTopicoModel {
    dataCadastroString: string = '';
    forumTopicoEnumNome: string = '';
    usuarioNome: string = '';

    usuarioFoto: File | undefined = undefined;

    resposta: number = 0;
    topicoRespostaCount: number = 0;

    public constructor(item?: Partial<ForumTopicoViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<ForumTopicoViewModel>): ForumTopicoViewModel {
        return new ForumTopicoViewModel(item);
    }
}