import { LineRule } from '../LineRule';
import { RuleScope } from '../RuleScope';

test("Block-scoped", () => {
    let rule = new LineRule();
    expect(rule.getScope()).toEqual(RuleScope.BLOCK);    
});

test("replace works", () => {
    let rule = new LineRule();
    let res = rule.replace();
    let expected = "<hr />";
    expect(res).toBe(expected);
})

test("applyTo works", () => {
    let rule = new LineRule();
    let input = "# title\nsome text\n\n---- \n## sub title\ncontent";
    let output = rule.applyTo(input);
    expect(output).toEqual(expect.stringMatching(/<hr \/>/gm));
})
