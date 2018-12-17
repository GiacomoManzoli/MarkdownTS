import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";

export class TitleRule extends ParsingRule {
    constructor() {
        super(/(#+)(.*)/g);
        this.scope = RuleScope.BLOCK;
    }

    replace(text, chars, content): string {
        var level = chars.length;
        return '<h' + level + '>' + content.trim() + '</h' + level + '>';
    }
}