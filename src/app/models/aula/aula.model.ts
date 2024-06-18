import { AulaComentarioModel } from "../aula-comentario";
import { AulaSessaoModel } from "../aula-sessao";
import { AulaTagModel } from "../aula-tag";
import { TagModel } from "../tag";

export class AulaModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	titulo: string = "";
    resumo: string = "";
    aulaTagMany: AulaTagModel[] = [];
    aulaComentarioMany: AulaComentarioModel[] = [];
    aulaSessaoMany: AulaSessaoModel[] = [];
    comentario: number = 0;
	favoritado: number = 0;
	curtido: number = 0;
    professorId: number = 0;
    areaFisicaId: number = 0;
    areaFisicaTitulo: string = '';
    publicado: boolean = false;
    aulaAnteriorId: number = 0;
    aulaPosteriorId: number = 0;

    professorNome: string = '';
    tagMany: TagModel[] = [];
}