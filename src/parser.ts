import * as Rules from "./rules";


export class Parser {
    rules: Rules.ParsingRule[];
    constructor(rules?:Rules.ParsingRule[]) {
        this.rules = [...rules];
    }

    addRule(rule: Rules.ParsingRule) {
        this.rules.push(rule);
        return this;
    }

    parseMarkdown(markdown: string) : string {
        let text = markdown;
        this.rules.forEach(rule => {
            text = rule.applyTo(text)   
        })
        return text;
    }

    static createDefaultParser() {
        const p = new Parser([
            new Rules.TitleRule(),
            new Rules.ImageRule(),
            new Rules.HyperLinkRule(),
            new Rules.BoldRule(),
            new Rules.ItalicRule(),
            new Rules.StrikeRule(),
            new Rules.QuoteRule(),
            new Rules.LineRule(),
            new Rules.InlineCodeRule(),
            new Rules.ListRule(),
            new Rules.CodeBlockRule()
        ]);
        return p;
    }
}