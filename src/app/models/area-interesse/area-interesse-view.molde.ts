import { AreaInteresseModel } from "./area-interesse.model";

export class AreaInteresseViewModel extends AreaInteresseModel {
    dataCadastroString: string = '';

    public constructor(item?: Partial<AreaInteresseViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<AreaInteresseViewModel>): AreaInteresseViewModel {
        return new AreaInteresseViewModel(item);
    }
}