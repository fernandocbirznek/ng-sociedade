export class TagModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	nome: string = "";

    protected constructor(item?: Partial<TagModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<TagModel>): TagModel {
        return new TagModel(item);
    }
}