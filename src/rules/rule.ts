import { RuleScope } from "./RuleScope";

export class ParsingRule {
    regex: RegExp;
    scope: RuleScope;
    
    constructor(regex: RegExp) {
        this.regex = regex;
        this.scope = RuleScope.UNSET;
    }

    getScope(): RuleScope {
        return this.scope;
    }

    applyTo(text: string): string {
        const replaceResult = text.replace(this.regex, this.replace.bind(this));
        return this.afterReplace(replaceResult);
        // const doReplace = () => text.replace(this.regex, this.replace.bind(this));
        // return this.afterReplace(doReplace());

    }

    replace(match: string, ...args: any[]): string {
        throw new Error("asd");
    }

    afterReplace(text: string): string {
        return text;
    }
}

