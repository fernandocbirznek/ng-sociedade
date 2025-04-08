export class AdministradorHomeForumInformacaoModel {
	forumCount: number = 0;
    forumTagCount: number = 0;
    forumTopicoCount: number = 0;
    forumTopicoReplicaCount: number = 0;
    forumTopicoRespostaCount: number = 0;

    protected constructor(item?: Partial<AdministradorHomeForumInformacaoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AdministradorHomeForumInformacaoModel>): AdministradorHomeForumInformacaoModel {
        return new AdministradorHomeForumInformacaoModel(item);
    }
}