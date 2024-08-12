

export class CriarContaPerfilModel {
	nome: string = "";
	email: string = "";
	senha: string = "";
    dataNascimento: Date | undefined = undefined;
    hobbie: string = "";
    foto: Uint8Array[] | undefined = undefined;
}