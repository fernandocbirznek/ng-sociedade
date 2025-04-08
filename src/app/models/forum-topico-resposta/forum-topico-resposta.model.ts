export class ForumTopicoRespostaModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	descricao: string = "";
    usuarioId: number = 0;
    forumTopicoId: number = 0;

    //TODO, colocar numa view
    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;

    protected constructor(item?: Partial<ForumTopicoRespostaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ForumTopicoRespostaModel>): ForumTopicoRespostaModel {
        return new ForumTopicoRespostaModel(item);
    }
}