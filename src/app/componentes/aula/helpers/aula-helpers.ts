import { DomSanitizer } from "@angular/platform-browser";
import { LinkYoutubeModel } from "src/app/models";

export class AulaHelpers {
    static getLinkYoutube(item: string, sanitizer: DomSanitizer): LinkYoutubeModel {
        let linkYoutube: LinkYoutubeModel = new LinkYoutubeModel();

        linkYoutube.src = sanitizer.bypassSecurityTrustResourceUrl(AulaHelpers.getSrcLink(item));
        linkYoutube.width = AulaHelpers.getWidthLink(item);
        linkYoutube.height = AulaHelpers.getHeightLink(item);
        linkYoutube.title = AulaHelpers.getTitleLink(item);

        return linkYoutube;
    }

    private static getSrcLink(item: string): string {
        const regex = /src="([^"]+)"/;
        const match = item.match(regex);

        if (match && match[1])
            return match[1];

        return '';
    }

    private static getWidthLink(item: string): number {
        const widthRegex = /width="([^"]+)"/;
        const widthMatch = item.match(widthRegex);

        if (widthMatch && widthMatch[1])
            return +widthMatch[1];

        return 0;
    }

    private static getHeightLink(item: string): number {
        const heightRegex = /height="([^"]+)"/;
        const heightMatch = item.match(heightRegex);

        if (heightMatch && heightMatch[1])
            return +heightMatch[1];

        return 0;
    }

    private static getTitleLink(item: string): string {
        const titleRegex = /title="([^"]+)"/;
        const titleMatch = item.match(titleRegex);

        if (titleMatch && titleMatch[1])
            return titleMatch[1];

        return '';
    }
}