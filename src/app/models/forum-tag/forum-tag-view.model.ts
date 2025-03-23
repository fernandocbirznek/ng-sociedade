import { ForumTagModel } from "./forum-tag.model";

export class ForumTagViewModel extends ForumTagModel {
    dataCadastroString: string = '';

    public constructor(item?: Partial<ForumTagViewModel>) {
        super(item);
        Object.assign(this, item);
    }

    static override create(item: Partial<ForumTagViewModel>): ForumTagViewModel {
        return new ForumTagViewModel(item);
    }
}