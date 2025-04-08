export class UsuarioAulaCurtidoModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	aulaId: number = 0;
	usuarioId: number = 0;

    protected constructor(item?: Partial<UsuarioAulaCurtidoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<UsuarioAulaCurtidoModel>): UsuarioAulaCurtidoModel {
        return new UsuarioAulaCurtidoModel(item);
    }
}