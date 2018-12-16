[![Build Status](https://travis-ci.com/GiacomoManzoli/MarkdownTS.svg?branch=master)](https://travis-ci.com/GiacomoManzoli/MarkdownTS)

# MarkdownTS

A dead simple, pluggable and modular Markdown parser written in TypeScript.

Heavily inspired form [CMS.js](https://github.com/chrisdiana/cms.js).

## TODOS

- [~] Complete the parser!
    - [ ] Table? [maybe](https://stackoverflow.com/questions/9837935/regex-for-markdown-table-syntax)
- [ ] Executable blocks to render other code (such as a DOT graph)
- [ ] Parser configuration
- [X] Play around with a CI system

## Usage

```js
// imported via script
let markdown = "YourMarkDownCode";
let engine = new MarkdownTS.Engine();

let html = engine.render(markdown);
document.getElementById("output").innerText = html;
```

## Other

* The regex based approach is limited, it requires an `afterReplace` to clean up the extra HTML tag and also makes difficult to define certain rules, such as the `ParagraphRule`, which, for the moments works *almost* correctly only if applied at last.