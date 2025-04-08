export class ForumTopicoReplicaModel {
	id: number = 0;
    dataCadastro: Date | undefined = undefined;
	dataAtualizacao: Date | undefined = undefined;
    
	descricao: string = "";
    usuarioId: number = 0;
    forumTopicoRespostaId: number = 0;
    forumTopicoId: number = 0;

    //TODO, colocar numa view
    usuarioNome: string = '';
    usuarioFoto: File | undefined = undefined;

    protected constructor(item?: Partial<ForumTopicoReplicaModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<ForumTopicoReplicaModel>): ForumTopicoReplicaModel {
        return new ForumTopicoReplicaModel(item);
    }
}