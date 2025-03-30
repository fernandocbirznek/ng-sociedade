import { AulaModel } from "./aula.model";

export class AulaViewModel extends AulaModel {
    areaFisicaTitulo: string = '';

    aulaPosteriorNome: string = '';
    aulaAnteriorNome: string = '';

	usuarioLogadoCurtiu: boolean = false;
    usuarioLogadoFavoritada: boolean = false;

    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;

    dataCadastroString: string = '';

    public constructor(item?: Partial<AulaViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<AulaViewModel>): AulaViewModel {
        return new AulaViewModel(item);
    }
}