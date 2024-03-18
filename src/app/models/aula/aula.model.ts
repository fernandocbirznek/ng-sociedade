import { AulaComentarioModel } from "../aula-comentario";

export class AulaModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
	titulo: string = "";
    resumo: string = "";
    aulaComentarioMany: AulaComentarioModel[] = [];
    comentario: number = 0;
	favoritado: number = 0;
	curtido: number = 0;
    professorId: number = 0;
    areaFisicaId: number = 0;
    areaFisicaDescricao: string = '';
}