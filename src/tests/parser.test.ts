import { mocked } from 'ts-jest/utils'
import {Parser} from "../parser";
import { ParsingRule } from "../rules/rule";
jest.mock("../rules/rule");

const mockedParsingRule = mocked(ParsingRule, true);

let p: Parser;
let rules = [
    new ParsingRule(/./g),
    new ParsingRule(/./g),
    new ParsingRule(/./g)
];
beforeEach(() => {
    p = new Parser(rules);
    mockedParsingRule.mockClear();
})

test("Built!", () => {
    const count = p.rules.length;
    expect(count).toBe(rules.length);
    expect(p.rules).not.toBe(rules);
})

test('Can add Rules with a chain', () => {
    const preCount = p.rules.length;
    const r = p.addRule(new ParsingRule(/./g));
    const postCount = p.rules.length;
    expect(postCount).toBe(preCount+1);
    expect(r).toBe(p);
})

test("Uses all the rule", () => {
    p.parseMarkdown("sample");
    expect(ParsingRule.prototype.applyTo).toHaveBeenCalledTimes(p.rules.length);
});

test("Follow the order and respect the steps", () => {
    let rule1 = new ParsingRule(/./g);
    let rule2 = new ParsingRule(/./g);
    let rule3 = new ParsingRule(/./g);

    let parser = new Parser([rule1, rule2, rule3]);

    const RULE1_RES = "RULE1_RESULT";
    const RULE2_RES = "RULE2_RESULT";
    rule1.applyTo = jest.fn().mockImplementation(() => {
        return RULE1_RES;
    })
    rule2.applyTo = jest.fn().mockImplementation(() => {
        return RULE2_RES;
    })
    parser.parseMarkdown("test");

    expect(rule1.applyTo).toHaveBeenCalled();
    expect(rule2.applyTo).toBeCalledWith(RULE1_RES);
    expect(rule3.applyTo).toBeCalledWith(RULE2_RES);

});