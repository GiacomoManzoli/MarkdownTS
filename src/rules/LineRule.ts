import {ParsingRule} from "./rule";

export class LineRule extends ParsingRule {
    constructor() {
        super(/\n-{3,}/g);
    }

    replace(): string {
        return "<hr />"
    }
}