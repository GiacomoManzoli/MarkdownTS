import { ParsingRule } from "./rule";

export class HyperLinkRule extends ParsingRule {
    constructor() {
        super(/\[([^[]+)\]\(([^)]+)\)/g);
    }

    replace(match, text, href): string {
        return `<a href=\"${href}\">${text}</a>`;
    }
}