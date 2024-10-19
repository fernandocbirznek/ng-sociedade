import { 
    AulaViewModel,
    TipoOrdenarAulaFiltroEnum 
} from "../../../models";

export class TopicoHelpers {
    static ordernarByTipoAulaFiltroEnum(itens: AulaViewModel[], tipoEnum: TipoOrdenarAulaFiltroEnum): AulaViewModel[] {
        switch (tipoEnum) {
            case TipoOrdenarAulaFiltroEnum.Curtida:
                return itens.sort((a, b) => { 
                    if (a.curtido < 0) 
                        return -1; 
                    if (b.curtido < 0 ) 
                        return 1;

                    return b.curtido - a.curtido 
                });

            case TipoOrdenarAulaFiltroEnum.Favorito:
                return itens.sort((a, b) => { 
                    if (a.favoritado < 0) 
                        return -1; 
                    if (b.favoritado < 0 ) 
                        return 1;

                    return b.favoritado - a.favoritado 
                });

            case TipoOrdenarAulaFiltroEnum.Comentario:
                return itens.sort((a, b) => { 
                    if (a.comentario < 0) 
                        return -1; 
                    if (b.comentario < 0 ) 
                        return 1;

                    return b.comentario - a.comentario 
                });

            default:
                return itens;
          }
    }
}