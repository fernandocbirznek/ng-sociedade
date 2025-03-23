import { 
    TabelaModel 
} from "../../../models";

export class NoticiaStoreHelper {
    static getTabelaNoticia(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getTabelaNoticiaHeader(),
            colunaMany: this.getTabelaNoticiaColuna(),
            colunaWidth: this.getTabelaNoticiaColunaWidth(),
            buttonCriar: true,
            buttonCriarLabel: 'Nova notícia'
        });
    }

    static getTabelaNoticiaHeader(): string[] {
        return ['Ação', 'Título', 'Resumo', 'Data de cadastro'];
    }

    static getTabelaNoticiaColuna(): string[] {
        return ['acao', 'titulo', 'resumo', 'dataCadastroString'];
    }

    static getTabelaNoticiaColunaWidth(): number[] {
        return [2, 3, 6, 2];
    }
}