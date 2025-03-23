import { 
    TabelaModel 
} from "../../../models";

export class ForumTopicoStoreHelper {
    static getTabelaForumTopico(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getForumTopicoHeader(),
            colunaMany: this.getForumTopicoColuna(),
            colunaWidth: this.getForumTopicoColunaWidth(),
            buttonEditar: false
        });
    }

    static getForumTopicoHeader(): string[] {
        return ['Ação', 'Título', 'Descrição', 'Data de cadastro'];
    }

    static getForumTopicoColuna(): string[] {
        return ['acao', 'titulo', 'descricao', 'dataCadastroString'];
    }

    static getForumTopicoColunaWidth(): number[] {
        return [2, 3, 6, 2];
    }
}