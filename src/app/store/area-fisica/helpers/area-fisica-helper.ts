import { 
    TabelaModel 
} from "../../../models";

export class AreaFisicaStoreHelpers {
    static getAdministradorTabelaAreaFisica(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getAdministradorTabelaAreaFisicaHeader(),
            colunaMany: this.getAdministradorTabelaAreaFisicaColuna(),
            colunaWidth: this.getAdministradorTabelaAreaFisicaColunaWidth(),
            buttonEditar: false
        });
    }

    static getAdministradorTabelaAreaFisicaHeader(): string[] {
        return ['Ação', 'Título', 'Data cadastro'];
    }

    static getAdministradorTabelaAreaFisicaColuna(): string[] {
        return ['acao', 'titulo', 'dataCadastroString'];
    }

    static getAdministradorTabelaAreaFisicaColunaWidth(): number[] {
        return [2, 3, 2];
    }
}