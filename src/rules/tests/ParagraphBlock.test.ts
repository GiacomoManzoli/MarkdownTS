import { ParagraphRule } from "../ParagraphRule";
import { RuleScope } from "../RuleScope";


let rule : ParagraphRule;
beforeAll(() => {
    rule = new ParagraphRule();
});

test("Block-scoped", () => {
    expect(rule.getScope()).toEqual(RuleScope.BLOCK);    
});

test("Regex base case", () => {
    const input = "\na\n";
    const output = rule.regex.exec(input);
    expect(output).not.toBeNull();
    expect(output[0]).toEqual("a");
    expect(output[1]).toEqual("a");
})

test("Regex multiple case", () => {
    const input = "\na\na\n";
    rule.regex.lastIndex = 0;
    let output = rule.regex.exec(input);
    expect(output).not.toBeNull();
    expect(output[0]).toEqual("a");
    expect(output[1]).toEqual("a");
    output = rule.regex.exec(input);
    expect(output).not.toBeNull();
    expect(output[0]).toEqual("a");
    expect(output[1]).toEqual("a");
})

test ("Render", () => {
    let result = "\n<p>a</p>\n";
    expect(rule.replace("a", "a")).toEqual(result);
})

test("After replace", () => {
    let expected = "<p>a a</p>";
    let output = rule.afterReplace("<p>a</p>\n<p>a</p>");
    expect(output.trim()).toEqual(expected);
})

test("After replace with separeted paragraph", () => {
    let input = "<p>a</p>\n\n<p>a</p>";
    let output = rule.afterReplace(input);
    expect(output.trim()).toEqual(input);
})

test("I: Consecutive Paragraphs", () => {
    const output = rule.applyTo("\na\n\n**a**\n");

    const expectPart1 = "<p>a</p>";
    const expectPart2 = "<p>**a**</p>";

    expect(output).toContain(expectPart1);
    expect(output).toContain(expectPart2);

});

test("I: Consecutive Paragraphs 2", () => {
    const output = rule.applyTo(`# Markdown Parser\n\nSome text. TypeScript ~~sucks~~ is awesome!\n\n**bold text** __also blod__\n\n*text* _text_`);

    const expects = [
        "# Markdown Parser",
        "<p>**bold text** __also blod__</p>",
        "<p>*text* _text_</p>"
    ];

    expects.forEach(e => {
        expect(output).toContain(e);
    });
});


