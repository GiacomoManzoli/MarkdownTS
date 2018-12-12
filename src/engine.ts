import { Parser } from "./parser";

export class Engine {
    parser: Parser;

    constructor(parser?: Parser) {
        this.parser = parser !== undefined? parser : Parser.createDefaultParser();
    }

    render(markdown: string) {
        return this.parser.parseMarkdown(markdown);
    }
}

