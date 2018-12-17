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