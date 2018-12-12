import { ParsingRule } from "./rule";

export interface CodeBlockRender {
    renderCode(language: string, code: string) : string;
}

export class PlainCodeBlockRenderer implements CodeBlockRender {
    renderCode(language, code): string {
        return `<pre class="${language}">${code}</pre>`;
    }
}

export class CodeBlockRule extends ParsingRule {
    codeRenderer: CodeBlockRender;

    constructor(codeRenderer: CodeBlockRender = new PlainCodeBlockRenderer()) {
        super(/```([a-z]*)\n([\s\S]*?)\n```/g);
        this.codeRenderer = codeRenderer;
    }

    replace(match, language, code): string {
        return this.codeRenderer.renderCode(language, code);
    }
}