import {ParsingRule} from "./rule";

class InlineTextRule extends ParsingRule {
    tagOpen: string;
    tagClose: string;

    constructor(regex, tagOpen, tagClose) {
        super(regex);
        this.tagOpen = tagOpen;
        this.tagClose = tagClose;
    }

    replace(match, g1): string {
        return `${this.tagOpen}${g1}${this.tagClose}`;
    }
}

export class BoldRule extends ParsingRule {
    constructor() {
        super(/(\*\*|__)(.*?)\1/g);
    }

    replace(match, g1, g2): string {
        return `<strong>${g2}</strong>`;
    }
}

export class ItalicRule extends ParsingRule {
    constructor() {
        super(/(\*|_)(.*?)\1/g);
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


