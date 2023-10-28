import { AreaInteresseModel } from "../area-interesse";

export class NoticiaModel {
	id: number = 0;
	titulo: string = "";
	resumo: string = "";
	descricao: string = "";
    usuarioId: string = "";
	usuarioNome: string = "";
	dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;

	areaInteresses: AreaInteresseModel[] = [] 
}