import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";

export class ListRule extends ParsingRule {
    listRegex: RegExp;

    constructor() {
        // super(/^(\t{0,})(\*|-|\d.)\s(.*)/gm);
        // Preseleziona una lista
        // imponendo che ci sia almeno una riga vuota prima della lista e che la lista non sia alla fine del file
        // vedi esempio sotto
        // const preselectRegex = /\n\n(^(\t{0,})(\*|-|\d.).*\n)+\n?/gm;
        // const preselectRegex = /\n?\n?(^(\t{0,})(\*|-|\d.).*\n?)+/gm;
        const preselectRegex = /\n{0,2}(^(\t{0,})(\*|-|\d.)\s.*\n?)+/gm;
        super(preselectRegex)
        this.listRegex = /^(\t{0,})(\*|-|\d.)\s(.*)/gm
        this.replaceList = this.replaceList.bind(this);
        this.scope = RuleScope.BLOCK
    }


    replace(match): string {
        const result = match.replace(this.listRegex, this.replaceList);
        return `\n${result.trim()}\n`;
    }

    replaceList(match, tabs: string, symbol: string, text: string): string {
        const level = tabs.length + 1;
        const listType = symbol === "*" || symbol === "-" ? "ul" : "ol";

        const tagOpen = `<${listType}><li>`;
        const tagClose = `</li></${listType}>`;

        let result = tagOpen.repeat(level) + `<span>${text}</span>` + tagClose.repeat(level) + "\n";

        return this.clearExtraTag(result, level);
    }


    clearExtraTag(text: string, level: number): string {
        for (let i = 1; i <= level; i++) {
            text = text.replace(/\<\/ul>\s*\<ul>/gm, "");
            text = text.replace(/\<\/ul>\s*\<ol>/gm, "");
            text = text.replace(/\<\/ol>\s*\<ol>/gm, "");
            text = text.replace(/\<\/ol>\s*\<ul>/gm, "");

            text = text.replace(/\<\/li>\s*\<li>\s*\<ul>/gm, "<ul>");
            text = text.replace(/\<\/li>\s*\<li>\s*\<ol>/gm, "<ol>");
        }

        return `\n${text.trim()}\n`;
    }
}

/**
la preselectRegex seleziona solamente la prima e la quarta lista. se non ci fosse il ritorna a capo finale non prenderebbe
neanche l'ultima

asddasd

* elem 1
* elem 2
	- child 1
		* child 2 
			* child 2 
	* child 2 

asd
		* child 1
* elem 3
	* child 1

asd


asd

* elem 1
* elem 2
	1. child 1
	2. child 2 
asd

asd

		* child 1
* elem 3
	* child 1
 
 */