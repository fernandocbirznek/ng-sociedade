export class ArquivoPdfModel {
	id: number = 0;
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

    nome: string = '';
    conteudo: Blob | undefined = undefined;
    contentType: string = '';
    aulaId: number = 0;

    protected constructor(item?: Partial<ArquivoPdfModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ArquivoPdfModel>): ArquivoPdfModel {
        return new ArquivoPdfModel(item);
    }
}