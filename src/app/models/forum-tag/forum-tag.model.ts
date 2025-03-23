export class ForumTagModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	titulo: string = "";

	protected constructor(item?: Partial<ForumTagModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ForumTagModel>): ForumTagModel {
        return new ForumTagModel(item);
    }
}