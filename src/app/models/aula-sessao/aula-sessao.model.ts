import { ArquivoPdfModel } from "../arquivo-pdf";
import { TipoSessaoAulaEnum } from "../enum";

export class AulaSessaoModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

    aulaId: number = 0;
	titulo: string = "";
    ordem: number = 0;

	conteudo: string = "";
    arquivoPdf: ArquivoPdfModel | undefined = undefined;

	favoritado: number = 0;
    aulaSessaoTipo: TipoSessaoAulaEnum = TipoSessaoAulaEnum.None;

    protected constructor(item?: Partial<AulaSessaoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AulaSessaoModel>): AulaSessaoModel {
        return new AulaSessaoModel(item);
    }
}