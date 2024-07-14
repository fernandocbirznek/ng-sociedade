import { ForumTopicoEnum } from "../enum";
import { ForumTagModel } from "../forum-tag";

export class ForumTopicoModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	titulo: string = "";
	descricao: string = "";
    usuarioId: number = 0;
    forumId: number = 0;
	forumTagMany: ForumTagModel[] = [];
	forumTopicoEnum: ForumTopicoEnum = ForumTopicoEnum.Geral;

	//TODO, colocar numa view
	resposta: number = 0;
}