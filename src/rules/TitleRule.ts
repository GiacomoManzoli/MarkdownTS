import { ParsingRule } from "./rule";

export class TitleRule extends ParsingRule {
    constructor() {
        super(/(#+)(.*)/g);
    }

    replace(text, chars, content): string {
        var level = chars.length;
        return '<h' + level + '>' + content.trim() + '</h' + level + '>';
    }
}