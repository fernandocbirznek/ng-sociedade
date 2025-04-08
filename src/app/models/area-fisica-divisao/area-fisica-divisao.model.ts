export class AreaFisicaDivisaoModel {
	id: number = 0;
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	descricao: string = "";
	titulo: string = '';
	areaFisicaId: number = 0;
    foto: File | undefined = undefined;

	protected constructor(item?: Partial<AreaFisicaDivisaoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AreaFisicaDivisaoModel>): AreaFisicaDivisaoModel {
        return new AreaFisicaDivisaoModel(item);
    }
}