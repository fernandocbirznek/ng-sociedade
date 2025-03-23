import { 
    TabelaModel 
} from "../../../models";

export class AreaInteresseStoreHelper {
    static getTabelaAreaInteresse(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getTabelaAreaInteresseHeader(),
            colunaMany: this.getTabelaAreaInteresseColuna(),
            colunaWidth: this.getTabelaAreaInteresseColunaWidth(),
            buttonEditar: false
        });
    }

    static getTabelaAreaInteresseHeader(): string[] {
        return ['Ação', 'Nome', 'Data cadastro'];
    }

    static getTabelaAreaInteresseColuna(): string[] {
        return ['acao', 'nome', 'dataCadastroString'];
    }

    static getTabelaAreaInteresseColunaWidth(): number[] {
        return [0.5, 3, 2];
    }
}