import { AulaModel } from "./aula.model";

export class AulaViewModel extends AulaModel {
	usuarioLogadoCurtiu: boolean = false;
    usuarioLogadoFavoritada: boolean = false;

    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;
}