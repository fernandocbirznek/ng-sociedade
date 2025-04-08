export class InformacaoAulaAlunoViewModel {
	aulaCurtida: number = 0;
    aulaFavoritada: number = 0;
    aulaSessaoFavoritada: number = 0;
    aulaComentario: number = 0;

    protected constructor(item?: Partial<InformacaoAulaAlunoViewModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<InformacaoAulaAlunoViewModel>): InformacaoAulaAlunoViewModel {
        return new InformacaoAulaAlunoViewModel(item);
    }
}