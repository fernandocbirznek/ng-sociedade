export class CriarContaPerfilModel {
	nome: string = "";
	email: string = "";
	senha: string = "";
    dataNascimento: Date | undefined = undefined;
    hobbie: string = "";
    foto: Uint8Array[] | undefined = undefined;

    protected constructor(item?: Partial<CriarContaPerfilModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<CriarContaPerfilModel>): CriarContaPerfilModel {
        return new CriarContaPerfilModel(item);
    }
}