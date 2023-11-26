import { TipoSessaoAulaEnum } from "../enum";

export class AulaSessaoModel {
    id: number = 0;
    aulaId: number = 0;
	titulo: string = "";
    ordem: number = 0;
	conteudo: string = "";
	favoritado: number = 0;
    aulaSessaoTipo: TipoSessaoAulaEnum = TipoSessaoAulaEnum.None;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;
}