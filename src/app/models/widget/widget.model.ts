import { AulaModel } from "../aula";

export class WidgetModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	aula: AulaModel | undefined = undefined;
    usuarioId: number = 0;
    aulaId: number = 0;

    protected constructor(item?: Partial<WidgetModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<WidgetModel>): WidgetModel {
        return new WidgetModel(item);
    }
}