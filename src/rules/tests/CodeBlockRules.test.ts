import { CodeBlockRule, CodeBlockRender, PlainCodeBlockRenderer } from "../CodeBlockRule";

test("replace works with default config", () => {
    let rule = new CodeBlockRule();
    rule.codeRenderer.renderCode = jest.fn((l,c) => {
        return `<pre>${c}</pre>`;
    });
    let res = rule.replace('','javascript','var x = "asd";');
    let expected = "<pre>var x = \"asd\";</pre>";
    expect(res).toBe(expected);
    expect(rule.codeRenderer.renderCode).toBeCalled();
})

test("replace works with custom config", () => {
    class RenderTest implements CodeBlockRender {
        renderCode(l,c) {
            return `<${l}>${c}</${l}>`;
        }
    }

    let rule = new CodeBlockRule(new RenderTest());
    let res = rule.replace('','javascript','var x = "asd";');
    let expected = "<javascript>var x = \"asd\";</javascript>";
    expect(res).toBe(expected);
})

test("CodeBlockRule - regex", () => {
    let rule = new CodeBlockRule();
    let input = "\n```js\nlet x = asd;\n```\n";
    let res = rule.regex.exec(input);
    expect(res).not.toBeNull();
    rule.regex.lastIndex = 0;

    input = "\n```js\nlet x = asd;```\n";
    res = rule.regex.exec(input);
    expect(res).toBeNull();
    rule.regex.lastIndex = 0;
})

test("applyTo works", () => {
    let rule = new CodeBlockRule();
    rule.codeRenderer.renderCode = jest.fn().mockImplementation((l,c) => {
        return `<pre>${c}</pre>`;
    });
    let input = "\n```js\nlet x = asd;\n```\n";

    let output = rule.applyTo(input);
    expect(rule.codeRenderer.renderCode).toBeCalled();
    expect(output).toContain("<pre>let x = asd;</pre>");
})

// PlainText

test("PlainText code block render", () => {
    const r = new PlainCodeBlockRenderer();
    const res = r.renderCode("js", "something");
    expect(res).toEqual("<pre class=\"js\">something</pre>")
});