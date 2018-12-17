import {ParsingRule} from "./rule";
import { RuleScope } from "./RuleScope";

export class ImageRule extends ParsingRule {
    constructor() {
        super(/!\[([^[]+)\]\(([^)]+)\)/g);
        this.scope = RuleScope.INLINE;
    }

    replace(text, caption, source): string {
        return `<img src=\"${source}\" alt=\"${caption}\" />`;
    }
}