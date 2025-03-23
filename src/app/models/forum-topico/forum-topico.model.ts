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

	protected constructor(item?: Partial<ForumTopicoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ForumTopicoModel>): ForumTopicoModel {
        return new ForumTopicoModel(item);
    }
}