export class NoticiaRequestModel {
	id: number = 0;
	titulo: string = "";
	resumo: string = "";
	conteudo: string = "";
    usuarioCadastroId: number = 0;
	areaInteresseMany: number[] = [];

	protected constructor(item?: Partial<NoticiaRequestModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<NoticiaRequestModel>): NoticiaRequestModel {
        return new NoticiaRequestModel(item);
    }
}