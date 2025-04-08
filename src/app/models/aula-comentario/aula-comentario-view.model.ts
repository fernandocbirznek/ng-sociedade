import { AulaComentarioModel } from "./aula-comentario.model";

export class AulaComentarioViewModel extends AulaComentarioModel {
    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;

    public constructor(item?: Partial<AulaComentarioViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<AulaComentarioViewModel>): AulaComentarioViewModel {
        return new AulaComentarioViewModel(item);
    }
}