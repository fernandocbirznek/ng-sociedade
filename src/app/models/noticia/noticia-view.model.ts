import { NoticiaModel } from "./noticia.model";

export class NoticiaViewModel extends NoticiaModel {
	usuarioLogadoCurtiu: boolean = false;
	dataCadastroString: string = '';

	public constructor(item?: Partial<NoticiaViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<NoticiaViewModel>): NoticiaViewModel {
        return new NoticiaViewModel(item);
    }
}