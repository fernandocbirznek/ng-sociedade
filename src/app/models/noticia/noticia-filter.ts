import { AreaInteresseModel } from "../area-interesse";

export class NoticiaFilterModel {
	usuarioNome: string | undefined = undefined;
    noticiaTitulo: string | undefined = undefined;

	dataInicio: Date | undefined = undefined;
	dataFim: Date | undefined = undefined;

	areaInteresseMany: AreaInteresseModel[] = [];
}