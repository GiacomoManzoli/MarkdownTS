import { CodeBlockRenderer} from "./CodeBlockRendered";

export class PlainCodeBlockRenderer implements CodeBlockRenderer {
    render(block: string, language: string, code: string): string {
        return `<pre class="${language}">${code}</pre>`;
    }
}