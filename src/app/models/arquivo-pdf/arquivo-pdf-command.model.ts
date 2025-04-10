import { AulaSessaoModel } from "../aula-sessao";
import { ArquivoPdfModel } from "./arquivo-pdf.model";

export class ArquivoPdfCommandModel extends ArquivoPdfModel {
	file: File | undefined = undefined;
    aulaSessao: AulaSessaoModel | undefined = undefined;

    aulaSessaoId: number = 0;
    aulaSessaoDataCadastro: Date | undefined = undefined;

    public constructor(item?: Partial<ArquivoPdfCommandModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<ArquivoPdfCommandModel>): ArquivoPdfCommandModel {
        return new ArquivoPdfCommandModel(item);
    }
}