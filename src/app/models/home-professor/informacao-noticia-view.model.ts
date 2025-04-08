export class InformacaoNoticiaViewModel {
	noticiaCriadaMany: number = 0;
    noticiaCurtidoMany: number = 0;

    protected constructor(item?: Partial<InformacaoNoticiaViewModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<InformacaoNoticiaViewModel>): InformacaoNoticiaViewModel {
        return new InformacaoNoticiaViewModel(item);
    }
}