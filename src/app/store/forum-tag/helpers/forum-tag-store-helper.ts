import { 
    TabelaModel 
} from "../../../models";

export class ForumTagStoreHelper {
    static getTabelaForumTag(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getForumTagHeader(),
            colunaMany: this.getForumTagColuna(),
            colunaWidth: this.getForumTagColunaWidth(),
            buttonEditar: false,
            buttonCriar: true,
            buttonCriarLabel: 'Nova tag para fórum',
            buttonVisualizar: false
        });
    }

    static getForumTagHeader(): string[] {
        return ['Ação', 'Título', 'Data de cadastro'];
    }

    static getForumTagColuna(): string[] {
        return ['acao', 'titulo', 'dataCadastroString'];
    }

    static getForumTagColunaWidth(): number[] {
        return [0.5, 3, 2];
    }
}