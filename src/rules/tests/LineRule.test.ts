import { LineRule } from '../LineRule';


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
