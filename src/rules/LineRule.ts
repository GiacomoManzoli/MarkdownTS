import {ParsingRule} from "./rule";
import { RuleScope } from "./RuleScope";

export class LineRule extends ParsingRule {
    constructor() {
        super(/\n-{3,}/g);
        this.scope = RuleScope.BLOCK;
    }

    replace(): string {
        return "\n<hr />";
    }
}