import { SafeUrl } from "@angular/platform-browser";

export class LinkYoutubeModel {
	width: number = 0;
	height: number = 0;
	src: SafeUrl = "";
    title: string = "";

	protected constructor(item?: Partial<LinkYoutubeModel>) {
        Object.assign(this, item);
    }

    static create(item: Partial<LinkYoutubeModel>): LinkYoutubeModel {
        return new LinkYoutubeModel(item);
    }
}