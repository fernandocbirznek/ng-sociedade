export class AreaInteresseModel {
	id: number = 0;
	nome: string = "";
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	protected constructor(item?: Partial<AreaInteresseModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AreaInteresseModel>): AreaInteresseModel {
        return new AreaInteresseModel(item);
    }
}