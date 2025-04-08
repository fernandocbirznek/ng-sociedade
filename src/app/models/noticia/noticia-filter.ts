import { AreaInteresseModel } from "../area-interesse";

export class NoticiaFilterModel {
	usuarioNome: string | undefined = undefined;
    noticiaTitulo: string | undefined = undefined;

	dataInicio: Date | undefined = undefined;
	dataFim: Date | undefined = undefined;

	areaInteresseMany: AreaInteresseModel[] = [];

	protected constructor(item?: Partial<NoticiaFilterModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<NoticiaFilterModel>): NoticiaFilterModel {
        return new NoticiaFilterModel(item);
    }
}