import { 
    TabelaModel 
} from "../../../models";

export class TagStoreHelper {
    static getTabelaTag(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getTabelaTagHeader(),
            colunaMany: this.getTabelaTagColuna(),
            colunaWidth: this.getTabelaTagColunaWidth(),
            buttonCriar: true,
            buttonVisualizar: false,
            buttonEditar: false,
            buttonCriarLabel: 'Nova tag'
        });
    }

    static getTabelaTagHeader(): string[] {
        return ['Ação', 'Nome', 'Data cadastro'];
    }

    static getTabelaTagColuna(): string[] {
        return ['acao', 'nome', 'dataCadastroString'];
    }

    static getTabelaTagColunaWidth(): number[] {
        return [0.5, 3, 2];
    }
}