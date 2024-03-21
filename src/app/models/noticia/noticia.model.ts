import { AreaInteresseModel } from "../area-interesse";

export class NoticiaModel {
	id: number = 0;
	titulo: string = "";
	resumo: string = "";
	conteudo: string = "";
    usuarioCadastroId: number = 0;
	usuarioCadastroNome: string = "";
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	areaInteresseMany: AreaInteresseModel[] = [] 
}