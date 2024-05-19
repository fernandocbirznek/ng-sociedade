import { TipoOrdenarAulaFiltroEnum } from "../enum";
import { TagModel } from "../tag";

export class AulaFilterModel {
	nomeProfessor: string | undefined = undefined;
    aulaTitulo: string | undefined = undefined;

	dataInicio: Date | undefined = undefined;
	dataFim: Date | undefined = undefined;

	tagMany: TagModel[] = [];

	tipoOrdenarAulaFiltroEnum: TipoOrdenarAulaFiltroEnum = TipoOrdenarAulaFiltroEnum.None;
}