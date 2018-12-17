import { HyperLinkRule } from "../HyperLinkRule";
import { RuleScope } from "../RuleScope";

test("Iinline-scoped", () => {
    let rule = new HyperLinkRule();
    expect(rule.getScope()).toEqual(RuleScope.INLINE);    
});

test("replace works", () => {
    let rule = new HyperLinkRule();
    let res = rule.replace('','Caption','http://www.test.com/image.png');
    let expected = "<a href=\"http://www.test.com/image.png\">Caption</a>";
    expect(res).toBe(expected);

    res = rule.replace('','','http://www.test.com/image.png');
    expected = "<a href=\"http://www.test.com/image.png\"></a>";
    expect(res).toBe(expected);

    res = rule.replace('','','');
    expected = "<a href=\"\"></a>";
    expect(res).toBe(expected);

    res = rule.replace('','Caption','');
    expected = "<a href=\"\">Caption</a>";    
    expect(res).toBe(expected);
})

test("applyTo works", () => {
    let rule = new HyperLinkRule();
    let input = "[C1](pic.png) [C2]()";
    let output = rule.applyTo(input);

    expect(output).toEqual(expect.stringMatching(/\<a\shref=".*"\>.*\<\/a>/gm));
})
