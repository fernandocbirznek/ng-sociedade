export class NoticiaFilterSelectedModel {
	id: number = 0;
	matIconName: string = "";
	filtroNome: string = "";

	protected constructor(item?: Partial<NoticiaFilterSelectedModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<NoticiaFilterSelectedModel>): NoticiaFilterSelectedModel {
        return new NoticiaFilterSelectedModel(item);
    }
}