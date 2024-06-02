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
}