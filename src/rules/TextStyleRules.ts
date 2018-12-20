import {ParsingRule} from "./rule";
import { RuleScope } from "./RuleScope";

class InlineTextRule extends ParsingRule {
    tagOpen: string;
    tagClose: string;

    constructor(regex, tagOpen, tagClose) {
        super(regex);
        this.tagOpen = tagOpen;
        this.tagClose = tagClose;
        this.scope = RuleScope.INLINE;
    }

    replace(match, g1): string {
        return `${this.tagOpen}${g1}${this.tagClose}`;
    }
}

export class BoldRule extends ParsingRule {
    constructor() {
        super(/(\*\*|__)(.*?)\1/g);
        this.scope = RuleScope.INLINE;

    }

    replace(match, g1, g2): string {
        return `<strong>${g2}</strong>`;
    }
}

export class ItalicRule extends ParsingRule {
    constructor() {
        super(/(\*|_)(.*?)\1/g);
        this.scope = RuleScope.INLINE;

    }

    replace(match, g1, g2): string {
        return `<em>${g2}</em>`;
    }
}

export class StrikeRule extends InlineTextRule {
    constructor() {
        super(/~~(.*?)~~/g, "<del>", "</del>");
    }
}

export class InlineCodeRule extends InlineTextRule {
    constructor() {
        super(/`([^`\n]+)`/g, "<code>", "</code>");
    }
}

export class QuoteRule extends InlineTextRule {
    constructor() {
        super(/:"(.*?)":/g,"<q>","</q>");
    }

}


