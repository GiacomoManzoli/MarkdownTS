import { ParsingRule } from "./rule";

export interface BlockRenderer {
    render(...args: string[]) : string;
}

export interface CodeBlockRenderer extends BlockRenderer {
    render(block: string, language: string, code: string): string;
}

export class PlainCodeBlockRenderer implements CodeBlockRenderer {
    render(block: string, language: string, code: string): string {
        return `<pre class="${language}">${code}</pre>`;
    }
}

export class RenderableBlockRule extends ParsingRule {
    renderer: BlockRenderer;

    constructor(matcher: RegExp, renderer: BlockRenderer) {
        super(matcher);
        this.renderer = renderer;
    }

    replace(...args: string[]): string {
        return this.renderer.render(...args);
    }
}


export class CodeBlockRule extends RenderableBlockRule {
    constructor(render: BlockRenderer = new PlainCodeBlockRenderer()) {
        super(/```([a-z]*)\n([\s\S]*?)\n```/g, render);
    }
}

export class ExecutableBlockRule extends RenderableBlockRule {
    constructor(render: BlockRenderer = new PlainCodeBlockRenderer()) {
        super(/&&&([a-z]*)\n([\s\S]*?)\n&&&/g, render);
    }
}