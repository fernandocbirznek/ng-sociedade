export class AreaFisicaModel {
	id: number = 0;
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	descricao: string = "";
	titulo: string = '';
	aplicacao: string = '';

	protected constructor(item?: Partial<AreaFisicaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AreaFisicaModel>): AreaFisicaModel {
        return new AreaFisicaModel(item);
    }
}