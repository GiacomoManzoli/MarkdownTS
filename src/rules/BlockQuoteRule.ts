import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";

const TAG1 = ">";
const TAG2 = "&gt;"

export class BlockQuoteRule extends ParsingRule {
    maxLevel: number;

    constructor() {
        // super(/^(\t{0,})(\*|-|\d.)\s(.*)/gm);
        // Preseleziona una lista
        // imponendo che ci sia almeno una riga vuota prima della lista e che la lista non sia alla fine del file
        // vedi esempio sotto
        // const preselectRegex = /\n\n(^(\t{0,})(\*|-|\d.).*\n)+\n?/gm;
        const preselectRegex = /^((?:&gt;)+|>+)(.*)$/gm;

        super(preselectRegex);
        this.scope = RuleScope.BLOCK;
        this.maxLevel = 0;
    }

    replace(match: string, tag: string, text: string): string {
        const level = this.calculateLevel(tag);
        this.maxLevel = Math.max(level, this.maxLevel);
        const tagOpen = "<blockquote>";
        const tagClose = "</blockquote>";
        const result = tagOpen.repeat(level) + "\n" + text.trim() + "\n" + tagClose.repeat(level);
        return result;
    }

    calculateLevel(tagSequence: string): number {
        let tag = tagSequence.startsWith(TAG1) ? TAG1 : "";
        tag = tagSequence.startsWith(TAG2) ? TAG2 : tag;

        const validSequence = tag !== "";
        if (validSequence) {
            const leftover = tagSequence.substring(tag.length);
            return 1 + this.calculateLevel(leftover);
        } else {
            return 0;
        }
    }



    afterReplace(text: string): string {
        for (let i = 1; i <= this.maxLevel; i++) {
            text = text.replace(/\<\/blockquote>\s?\<blockquote>/gm, "");
        }
        return `\n${text}\n`;
    }
}
