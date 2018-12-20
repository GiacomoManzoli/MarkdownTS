import {ImageRule} from '../ImageRule';
import { RuleScope } from '../RuleScope';

test("Iinline-scoped", () => {
    let rule = new ImageRule();
    expect(rule.getScope()).toEqual(RuleScope.INLINE);    
});

test("replace works", () => {
    let rule = new ImageRule();
    let res = rule.replace('','Caption','http://www.test.com/image.png');
    let expected = "<img src=\"http://www.test.com/image.png\" alt=\"Caption\" />";
    expect(res).toBe(expected);

    res = rule.replace('','','http://www.test.com/image.png');
    expected = "<img src=\"http://www.test.com/image.png\" alt=\"\" />";
    expect(res).toBe(expected);

    res = rule.replace('','','');
    expected = "<img src=\"\" alt=\"\" />";
    expect(res).toBe(expected);

    res = rule.replace('','Caption','');
    expected = "<img src=\"\" alt=\"Caption\" />";
    expect(res).toBe(expected);
})

test("applyTo works", () => {
    let rule = new ImageRule();
    let input = "![C1](pic.png) [C2]()";
    let output = rule.applyTo(input);


    expect(output).toEqual(expect.stringMatching(/\<img\ssrc="pic.png"\salt="C1"\s\/>/gm));
})
