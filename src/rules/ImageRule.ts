import {ParsingRule} from "./rule";

export class ImageRule extends ParsingRule {
    constructor() {
        super(/!\[([^[]+)\]\(([^)]+)\)/g);
    }

    replace(text, caption, source): string {
        return `<img src=\"${source}\" alt=\"${caption}\" />`;
    }
}