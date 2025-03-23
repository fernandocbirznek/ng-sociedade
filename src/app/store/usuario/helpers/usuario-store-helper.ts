import { 
    TabelaModel 
} from "../../../models";

export class UsuarioStoreHelper {
    static getAdministradorTabelaUsuario(): TabelaModel {
        return TabelaModel.create({
            colunaHeader: this.getAdministradorTabelaUsuarioHeader(),
            colunaMany: this.getAdministradorTabelaUsuarioColuna(),
            colunaWidth: this.getAdministradorTabelaUsuarioColunaWidth(),
            buttonCriar: true,
            buttonCriarLabel: 'Novo usuário'
        });
    }

    static getAdministradorTabelaUsuarioHeader(): string[] {
        return ['Ação', 'Nome do usuário', 'E-mail', 'Data cadastro'];
    }

    static getAdministradorTabelaUsuarioColuna(): string[] {
        return ['acao', 'nome', 'email', 'dataCadastroString'];
    }

    static getAdministradorTabelaUsuarioColunaWidth(): number[] {
        return [2, 3, 3, 2];
    }
}