export class ParsingRule {
    regex: RegExp;

    constructor(regex:RegExp) {
        this.regex = regex;
    }

    applyTo(text: string) : string {
        const replaceResult = text.replace(this.regex, this.replace.bind(this));
        return this.afterReplace(replaceResult);
    }

    replace(match: string, ...args: any[]): string {
        throw new Error("asd");
    }

    afterReplace(text: string) : string {
        return text;
    }
}

