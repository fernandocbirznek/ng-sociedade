export class InformacaoWidgetAlunoViewModel {
	aulaParaCursarMany: number = 0;
    aulaCursandoMany: number = 0;
    aulaConcluidoMany: number = 0;

    protected constructor(item?: Partial<InformacaoWidgetAlunoViewModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<InformacaoWidgetAlunoViewModel>): InformacaoWidgetAlunoViewModel {
        return new InformacaoWidgetAlunoViewModel(item);
    }
}