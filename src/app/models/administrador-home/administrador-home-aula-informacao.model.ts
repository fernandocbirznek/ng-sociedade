export class AdministradorHomeAulaInformacaoModel {
	areaFisicaCount: number = 0;
    arquivoPdfCount: number = 0;
    aulaComentarioCount: number = 0;
    aulaFavoritadaCount: number = 0;
    aulaCount: number = 0;
    aulaSessaoCount: number = 0;
    aulaSessaoFavoritadaCount: number = 0;
    aulaCurtidoCount: number = 0;
    widgetConcluidoCount: number = 0;
    widgetCursandoCount: number = 0;
    widgetCursarCount: number = 0;

    protected constructor(item?: Partial<AdministradorHomeAulaInformacaoModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AdministradorHomeAulaInformacaoModel>): AdministradorHomeAulaInformacaoModel {
        return new AdministradorHomeAulaInformacaoModel(item);
    }
}