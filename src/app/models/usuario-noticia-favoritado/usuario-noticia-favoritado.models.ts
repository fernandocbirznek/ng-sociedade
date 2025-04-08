export class UsuarioNoticiaFavoritadoModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	noticiaId: number = 0;
	usuarioId: number = 0;

    protected constructor(item?: Partial<UsuarioNoticiaFavoritadoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<UsuarioNoticiaFavoritadoModel>): UsuarioNoticiaFavoritadoModel {
        return new UsuarioNoticiaFavoritadoModel(item);
    }
}