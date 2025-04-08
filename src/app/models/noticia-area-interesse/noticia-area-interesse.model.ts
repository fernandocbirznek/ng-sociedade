export class NoticiaAreaInteresseModel {
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
	noticiaId: number = 0;
	areaInteresseId: number = 0;
	areaInteresseNome: string = '';

	protected constructor(item?: Partial<NoticiaAreaInteresseModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<NoticiaAreaInteresseModel>): NoticiaAreaInteresseModel {
        return new NoticiaAreaInteresseModel(item);
    }
}