# MarkdownTS

A dead simple, pluggable and modular Markdown parser written in TypeScript.

Heavily inspired form [CMS.js](https://github.com/chrisdiana/cms.js).

## TODOS

- [ ] Complete the parser!
- [ ] Executable blocks to render other code (such as a DOT graph)
- [ ] Config the parser
- [ ] Play around with a CI system

## Usage

```js
// imported via script
let markdonw = "YourMarkDownCode";
let engine = new MarkdownTS.Engine();

let html = engine.render(markdown);
document.getElementById("output").innerText = html;
```
