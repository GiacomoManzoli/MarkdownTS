import { CodeBlockRule, CodeBlockRenderer, PlainCodeBlockRenderer, ExecutableBlockRule } from "../CodeBlockRule";

test("replace works with default config", () => {
    let rule = new CodeBlockRule();
    rule.renderer.render = jest.fn((m,l,c) => {
        return `<pre>${c}</pre>`;
    });
    let res = rule.replace('','javascript','var x = "asd";');
    let expected = "<pre>var x = \"asd\";</pre>";
    expect(res).toBe(expected);
    expect(rule.renderer.render).toBeCalled();
})

test("replace works with custom config", () => {
    class RenderTest implements CodeBlockRenderer {
        render(m,l,c) {
            return `<${l}>${c}</${l}>`;
        }
    }

    let rule = new CodeBlockRule(new RenderTest());
    let res = rule.replace('','javascript','var x = "asd";');
    let expected = "<javascript>var x = \"asd\";</javascript>";
    expect(res).toEqual(expected);
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

test("CodeBlockRule - applyTo works", () => {
    let rule = new CodeBlockRule();
    rule.renderer.render = jest.fn().mockImplementation((m,l,c) => {
        return `<pre>${c}</pre>`;
    });
    let input = "\n```js\nlet x = asd;\n```\n";

    let output = rule.applyTo(input);
    expect(rule.renderer.render).toBeCalled();
    expect(output).toContain("<pre>let x = asd;</pre>");
})

test("ExecutableBlockRule - regex", () => {
    let rule = new ExecutableBlockRule();
    let input = "\n&&&js\nlet x = asd;\n&&&\n";
    let res = rule.regex.exec(input);
    expect(res).not.toBeNull();
    rule.regex.lastIndex = 0;

    input = "\n&&&js\nlet x = asd;&&&\n";
    res = rule.regex.exec(input);
    expect(res).toBeNull();
    rule.regex.lastIndex = 0;
})

test("ExecutableBlockRule - applyTo works", () => {
    let rule = new ExecutableBlockRule();
    rule.renderer.render = jest.fn().mockImplementation((m,l,c) => {
        return `<pre>${c}</pre>`;
    });
    let input = "\n&&&js\nlet x = asd;\n&&&\n";

    let output = rule.applyTo(input);
    expect(rule.renderer.render).toBeCalled();
    expect(output).toContain("<pre>let x = asd;</pre>");
})


// PlainText

test("PlainText renders correctly a code block", () => {
    const r = new PlainCodeBlockRenderer();
    const res = r.render("","js", "something");
    expect(res).toEqual("<pre class=\"js\">something</pre>")
});