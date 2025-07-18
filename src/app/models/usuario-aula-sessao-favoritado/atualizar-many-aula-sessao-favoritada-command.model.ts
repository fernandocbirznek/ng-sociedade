export class AtualizarManyAulaSessaoFavoritadaCommand {
    id: number = 0;
    usuarioId: number = 0;
    aulaSessaoId: number = 0;
    muralPosicaoX: number = 0;
    muralPosicaoY: number = 0;

    public constructor(item?: Partial<AtualizarManyAulaSessaoFavoritadaCommand>) {
        Object.assign(this, item);
    }

    static create(item: Partial<AtualizarManyAulaSessaoFavoritadaCommand>): AtualizarManyAulaSessaoFavoritadaCommand {
        return new AtualizarManyAulaSessaoFavoritadaCommand(item);
    }
}