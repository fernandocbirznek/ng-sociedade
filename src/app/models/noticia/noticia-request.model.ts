export class NoticiaRequestModel {
	id: number = 0;
	titulo: string = "";
	resumo: string = "";
	conteudo: string = "";
    usuarioCadastroId: number = 0;
	areaInteresseMany: number[] = [];
}