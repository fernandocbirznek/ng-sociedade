import { 
    TabelaModel 
} from "../../../models";

export class AulaStoreHelpers {
    static getAdministradorTabelaAula(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getAdministradorTabelaAulaHeader(),
            colunaMany: this.getAdministradorTabelaAulaColuna(),
            colunaWidth: this.getAdministradorTabelaAulaColunaWidth(),
            buttonEditar: false
        });
    }

    static getAdministradorTabelaAulaHeader(): string[] {
        return ['Ação', 'Título da aula', 'Resumo da aula', 'Área da Física', 'Data postagem', 'Comentários', 'Curtido', 'Favoritado'];
    }

    static getAdministradorTabelaAulaColuna(): string[] {
        return ['acao', 'titulo', 'resumo', 'areaFisicaTitulo', 'dataCadastroString', 'comentario', 'curtido', 'favoritado'];
    }

    static getAdministradorTabelaAulaColunaWidth(): number[] {
        return [2, 2, 4, 2, 2, 2, 1, 1];
    }
}