export class AulaTagModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	aulaId: number = 0;
    tagId: number = 0;

    protected constructor(item?: Partial<AulaTagModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AulaTagModel>): AulaTagModel {
        return new AulaTagModel(item);
    }
}