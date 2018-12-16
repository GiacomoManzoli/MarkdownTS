import { ParsingRule } from "./rule";

export class ParagraphRule extends ParsingRule {
    constructor() {
        super(/^([^\n>&`#<]+.*)$/gm);
    } 

    replace(match: string, text: string): string {
        return `\n<p>${text.trim()}</p>\n`;
    }

    afterReplace(text: string): string {
        return text.replace(/<\/p>\s<p>/g,' ');
    }
}