import { TipoUsuarioEnum } from "../enum";
import { AreaInteresseModel } from "../area-interesse";

export class UsuarioModel {
    id: number = 0;
    dataCadastro: Date | undefined = undefined;
    dataAtualizacao: Date | undefined = undefined;

	nome: string = "";
	email: string = "";
	tipoUsuarioEnum: TipoUsuarioEnum = TipoUsuarioEnum.None;
    tipoUsuario: number = 0;
    comentarioForum: number = 0;
    topicoForum: number = 0;
    comentarioAula: number = 0;
    curtirAula: number = 0;
    noticiaVisualizada: number = 0;
    usuarioPerfilId: number = 0;
    dataNascimento: Date | undefined = undefined;
    foto: File | undefined = undefined;
    hobbie: string = "";
    sociedadeId: number = 0;
    token: string = "";
    usuarioAreaInteresses: AreaInteresseModel[] = [];
}