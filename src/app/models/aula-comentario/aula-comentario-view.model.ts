import { AulaComentarioModel } from "./aula-comentario.model";

export class AulaComentarioViewModel extends AulaComentarioModel {
    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;
}