export class SessaoHelpers {
    static isLinkYoutube(item: string): boolean {
        return item.includes('src="https://www.youtube.com/embed/');
    }
}