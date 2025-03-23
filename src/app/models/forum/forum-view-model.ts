import { ForumModel } from "./forum.model";

export class ForumViewModel extends ForumModel {
    dataCadastroString: string = '';

    public constructor(item?: Partial<ForumViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<ForumViewModel>): ForumViewModel {
        return new ForumViewModel(item);
    }
}