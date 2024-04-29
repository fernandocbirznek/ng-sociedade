export class ForumTopicoRespostaModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	descricao: string = "";
    usuarioId: number = 0;
    forumTopicoId: number = 0;
}