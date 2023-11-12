import { Byte } from "@angular/compiler/src/util";

export class CriarContaPerfilModel {
	nome: string = "";
	email: string = "";
	senha: string = "";
    dataNascimento: Date | undefined = undefined;
    hobbie: string = "";
    foto: Byte[] | undefined = undefined;
}