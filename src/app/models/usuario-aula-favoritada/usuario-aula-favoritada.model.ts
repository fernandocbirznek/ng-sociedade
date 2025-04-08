export class UsuarioAulaFavoritadaModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	aulaId: number = 0;
	usuarioId: number = 0;

    protected constructor(item?: Partial<UsuarioAulaFavoritadaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<UsuarioAulaFavoritadaModel>): UsuarioAulaFavoritadaModel {
        return new UsuarioAulaFavoritadaModel(item);
    }
}