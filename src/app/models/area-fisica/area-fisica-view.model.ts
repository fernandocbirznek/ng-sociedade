import { AreaFisicaModel } from "./area-fisica.model";

export class AreaFisicaViewModel extends AreaFisicaModel {
    dataCadastroString: string = '';

	public constructor(item?: Partial<AreaFisicaViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<AreaFisicaViewModel>): AreaFisicaViewModel {
        return new AreaFisicaViewModel(item);
    }
}