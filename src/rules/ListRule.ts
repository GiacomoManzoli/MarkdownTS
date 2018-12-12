import { ParsingRule } from "./rule";

export class ListRule extends ParsingRule {
    maxLevel: number;
    listRegex: RegExp;

    constructor() {
        // super(/^(\t{0,})(\*|-|\d.)\s(.*)/gm);
        // Preseleziona una lista
        // imponendo che ci sia almeno una riga vuota prima della lista e che la lista non sia alla fine del file
        // vedi esempio sotto
        // const preselectRegex = /\n\n(^(\t{0,})(\*|-|\d.).*\n)+\n?/gm;
        const preselectRegex = /\n?\n?(^(\t{0,})(\*|-|\d.).*\n?)+/gm;
        
        super(preselectRegex)
        this.listRegex = /^(\t{0,})(\*|-|\d.)\s(.*)/gm
        this.maxLevel = 0;
        this.replaceList = this.replaceList.bind(this);
    }


    replace(match): string {
        const result = match.replace(this.listRegex, this.replaceList).trim();
        return result;
    }

    replaceList(match, tabs: string, symbol: string, text: string): string {
        const level = tabs.length + 1;
        this.maxLevel = Math.max(level, this.maxLevel);
        const listType = symbol === "*" || symbol === "-" ? "ul" : "ol";

        const tagOpen = `<${listType}><li>`;
        const tagClose = `</li></${listType}>`;

        let result = tagOpen.repeat(level) + `<span>${text}</span>` + tagClose.repeat(level) + "\n";

        return result;
    }


    afterReplace(text: string): string {
        for (let i = 1; i <= this.maxLevel; i++) {
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