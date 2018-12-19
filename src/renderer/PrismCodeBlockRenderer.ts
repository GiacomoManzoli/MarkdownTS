import { CodeBlockRenderer } from "./CodeBlockRendered";
import * as Prism from "prismjs";
import "prismjs/themes/prism.css";

// import 'prismjs/themes/prism-okaidia.css'

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

        const languageClass = language !== ""? `language-${language}` : "language-not-set";
        return `<pre class="${languageClass}"><code class="${languageClass}">${formattedCode}</code></pre>`;
    }
}