export class UsuarioPerfilModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	dataNascimento: Date | undefined = undefined;
    foto: File | undefined = undefined;
    hobbie: string | undefined = undefined;
    usuarioId: number = 0;

    protected constructor(item?: Partial<UsuarioPerfilModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<UsuarioPerfilModel>): UsuarioPerfilModel {
        return new UsuarioPerfilModel(item);
    }
}