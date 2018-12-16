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

        let history = [];

        this.rules.forEach(rule => {
            console.log(`Applying rule: ${rule.constructor.name}`);
            let log = {
                rule: rule.constructor.name,
                input: text,
                output: rule.applyTo(text)
            };
            history.push(log);
            text = log.output;
        })
        console.table(history);
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
            new Rules.CodeBlockRule(),
            new Rules.ExecutableBlockRule(),
            new Rules.BlockQuoteRule(),
            new Rules.ParagraphRule(),
        ]);
        return p;
    }
}