export class InformacaoAulaViewModel {
	aulaCriadaMany: number = 0;
    aulaCurtidoMany: number = 0;
    aulaComentarioMany: number = 0;

    protected constructor(item?: Partial<InformacaoAulaViewModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<InformacaoAulaViewModel>): InformacaoAulaViewModel {
        return new InformacaoAulaViewModel(item);
    }
}