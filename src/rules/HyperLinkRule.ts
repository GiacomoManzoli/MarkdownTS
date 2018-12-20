import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";

export class HyperLinkRule extends ParsingRule {
    constructor() {
        super(/\[([^[]+)\]\(([^)]+)\)/g);
        this.scope = RuleScope.INLINE;
    }

    replace(match, text, href): string {
        return `<a href=\"${href}\">${text}</a>`;
    }
}