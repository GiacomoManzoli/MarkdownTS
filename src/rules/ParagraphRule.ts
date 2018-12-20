import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";

export class ParagraphRule extends ParsingRule {
    constructor() {
        super(/^([^\n>&`#<]+.*)$/gm);
        this.scope = RuleScope.BLOCK;
    } 

    replace(match: string, text: string): string {
        return `\n<p>${text.trim()}</p>\n`;
    }

    afterReplace(text: string): string {
        return text.replace(/<\/p>\s<p>/g,' ');
    }
}