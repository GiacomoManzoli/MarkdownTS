import { TitleRule } from '../TitleRule';
import { RuleScope } from '../RuleScope';

test("Block-quoted", () => {
    let rule = new TitleRule();
    expect(rule.getScope()).toEqual(RuleScope.BLOCK);
})

test("replace works", () => {
    let rule = new TitleRule();
    let res = rule.replace('### test','###',' test');
    let expected = "<h3>test</h3>";
    expect(res).toBe(expected);

    res = rule.replace('# test','#',' test');
    expected = "<h1>test</h1>";
    expect(res).toBe(expected);
})

test("applyTo works", () => {
    let rule = new TitleRule();
    let input = "# title\nsome text \n## sub title\ncontent";
    let output = rule.applyTo(input);
    expect(output).toEqual(expect.stringMatching(/<\/?h\d>/gm));
})
