import { UsuarioModel } from "src/app/models";

export class GenericoHelpers {
    static saveLocalStorage(usuarioLogado: UsuarioModel): void {
        localStorage.setItem('token', usuarioLogado.token);
    }

    static getToken(): string | null {
        return localStorage.getItem('token');
      }
    
    static logout(): void {
        localStorage.removeItem('token');
    }

    static sortArrayByDataCadastro(itens: any[]): any[] {
        return [...itens].sort((a, b) => {
            if (!a.dataCadastro || !b.dataCadastro)
                return 0;
            if (a.dataCadastro > b.dataCadastro)
                return 1;
            if (a.dataCadastro < b.dataCadastro)
                return -1;
            return 0;
        });
    }
}