import { 
    TabelaModel 
} from "../../../models";

export class ForumStoreHelper {
    static getTabelaForum(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getForumHeader(),
            colunaMany: this.getForumColuna(),
            colunaWidth: this.getForumColunaWidth(),
            buttonVisualizar: false,
            buttonCriar: true,
            buttonCriarLabel: 'Novo fórum'
        });
    }

    static getForumHeader(): string[] {
        return ['Ação', 'Título', 'Descrição', 'Data de cadastro'];
    }

    static getForumColuna(): string[] {
        return ['acao', 'titulo', 'descricao', 'dataCadastroString'];
    }

    static getForumColunaWidth(): number[] {
        return [2, 3, 6, 2];
    }
}