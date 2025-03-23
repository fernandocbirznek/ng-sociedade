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
}