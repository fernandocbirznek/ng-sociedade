import { TagModel } from "./tag.model";

export class TagViewModel extends TagModel {
    dataCadastroString: string = '';

    public constructor(item?: Partial<TagViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<TagViewModel>): TagViewModel {
        return new TagViewModel(item);
    }
}