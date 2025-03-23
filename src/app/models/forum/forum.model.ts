export class ForumModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	titulo: string = "";
	descricao: string = "";

	protected constructor(item?: Partial<ForumModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ForumModel>): ForumModel {
        return new ForumModel(item);
    }
}