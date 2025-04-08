export class HeaderRotaModel {
	rotaNome: string = '';
    rotaAcessar: string = '';
    rotaNivel: number = 0;

    protected constructor(item?: Partial<HeaderRotaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<HeaderRotaModel>): HeaderRotaModel {
        return new HeaderRotaModel(item);
    }
}