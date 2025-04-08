export class CriarConta {
	nome: string = "";
	email: string = "";
	senha: string = "";

	protected constructor(item?: Partial<CriarConta>) {
        Object.assign(this, item);
    }

    static create(item: Partial<CriarConta>): CriarConta {
        return new CriarConta(item);
    }
}