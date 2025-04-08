import { AulaSessaoModel } from "../aula-sessao";

export class UsuarioAulaSessaoFavoritadoModel extends AulaSessaoModel {
	usuarioId: number = 0;
    aulaSessaoId: number = 0;

    arquivoConteudo: any | undefined = undefined;

    public constructor(item?: Partial<UsuarioAulaSessaoFavoritadoModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<UsuarioAulaSessaoFavoritadoModel>): UsuarioAulaSessaoFavoritadoModel {
        return new UsuarioAulaSessaoFavoritadoModel(item);
    }
}