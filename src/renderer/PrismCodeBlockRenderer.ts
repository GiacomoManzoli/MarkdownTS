import { CodeBlockRenderer } from "./CodeBlockRendered";
import * as Prism from "prismjs";

export class PrismCodeBlockRenderer implements CodeBlockRenderer {
    render(block: string, language: string, code: string): string {

        const prismLanguage = Prism.languages[language];
        let formattedCode: string;
        if (prismLanguage) {
            formattedCode = Prism.highlight(code, prismLanguage);
        } else {
            formattedCode = code;
        }

        console.log(formattedCode);

        return `<pre class="language-${language}"><code class="language-${language}">${formattedCode}</code></pre>`;
    }
}