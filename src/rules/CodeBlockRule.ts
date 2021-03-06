import { ParsingRule } from "./rule";
import { RuleScope } from "./RuleScope";
import { BlockRenderer, PlainCodeBlockRenderer } from "../renderer";
import { PrismCodeBlockRenderer } from "../renderer/PrismCodeBlockRenderer";

export class RenderableBlockRule extends ParsingRule {
    renderer: BlockRenderer;

    constructor(matcher: RegExp, renderer: BlockRenderer) {
        super(matcher);
        this.scope = RuleScope.BLOCK;
        this.renderer = renderer;
    }

    replace(...args: string[]): string {
        return this.renderer.render(...args);
    }
}


export class CodeBlockRule extends RenderableBlockRule {
    constructor(render: BlockRenderer = new PrismCodeBlockRenderer()) {
        super(/```([a-z]*)\n([\s\S]*?)\n```/g, render);
    }
}

export class ExecutableBlockRule extends RenderableBlockRule {
    constructor(render: BlockRenderer = new PlainCodeBlockRenderer()) {
        super(/&&&([a-z]*)\n([\s\S]*?)\n&&&/g, render);
    }
}