import { UsuarioModel } from "./usuario.model";

export class UsuarioViewModel extends UsuarioModel {
    dataCadastroString: string = '';

    public constructor(item?: Partial<UsuarioViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<UsuarioViewModel>): UsuarioViewModel {
        return new UsuarioViewModel(item);
    }
}