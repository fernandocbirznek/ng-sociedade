export class AulaComentarioModel {
    id: number = 0;
	descricao: string = "";
    usuarioId: number = 0;
    aulaId: number = 0;
    dataCadastro: number = 0;
	dataAtualizacao: number = 0;

    protected constructor(item?: Partial<AulaComentarioModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AulaComentarioModel>): AulaComentarioModel {
        return new AulaComentarioModel(item);
    }
}