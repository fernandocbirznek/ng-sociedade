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

    static getTabelaAulaProfessor(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getTabelaAulaProfessorHeader(),
            colunaMany: this.getTabelaAulaProfessorColuna(),
            colunaWidth: this.getTabelaAulaProfessorColunaWidth(),
            buttonCriar: true,
            buttonCriarLabel: 'Criar aula'
        });
    }

    static getTabelaAulaProfessorHeader(): string[] {
        return ['Ação', 'Publicado', 'Título', 'Resumo', 'Área da física', 'Data cadastro', 'Comentarios', 'Curtido', 'Favoritado'];
    }

    static getTabelaAulaProfessorColuna(): string[] {
        return ['acao', 'publicado', 'titulo', 'resumo', 'areaFisicaTitulo', 'dataCadastroString', 'comentario', 'curtido', 'favoritado'];
    }

    static getTabelaAulaProfessorColunaWidth(): number[] {
        return [2, 1, 3, 4, 2, 2, 1, 1, 1];
    }
}