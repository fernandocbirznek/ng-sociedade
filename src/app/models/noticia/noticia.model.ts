import { AreaInteresseModel } from "../area-interesse";

export class NoticiaModel {
	id: number = 0;
	titulo: string = "";
	resumo: string = "";
	conteudo: string = "";
	favoritado: number = 0;
    usuarioCadastroId: number = 0;
	usuarioCadastroNome: string = "";
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	areaInteresseMany: AreaInteresseModel[] = [];

	protected constructor(item?: Partial<NoticiaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<NoticiaModel>): NoticiaModel {
        return new NoticiaModel(item);
    }
}