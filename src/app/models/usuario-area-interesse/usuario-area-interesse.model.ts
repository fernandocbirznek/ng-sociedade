export class UsuarioAreaInteresseModel {
    id: number = 0;
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	usuarioId: number = 0;
	areaInteresseId: number = 0;

	areaInteresseNome: string = '';

	protected constructor(item?: Partial<UsuarioAreaInteresseModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<UsuarioAreaInteresseModel>): UsuarioAreaInteresseModel {
        return new UsuarioAreaInteresseModel(item);
    }
}