import { mocked } from 'ts-jest/utils'
import { Parser, sortRulesByScope } from "../parser";
import { ParsingRule } from "../rules/rule";
import { RuleScope, ParagraphRule } from '../rules';
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
    expect(count).toEqual(rules.length);
    expect(p.rules).toEqual(rules);
})

test('Can add Rules with a chain', () => {
    const preCount = p.rules.length;
    const r = p.addRule(new ParsingRule(/./g));
    const postCount = p.rules.length;
    
    expect(postCount).toBe(preCount + 1);
    expect(r).toBe(p);
})

test("Add rules keep the rules sorted by scope", () => {
    let ruleBlock = new ParsingRule(/./g);
    let ruleInline = new ParsingRule(/./g);

    ruleBlock.getScope = jest.fn().mockReturnValue(RuleScope.BLOCK);
    ruleInline.getScope = jest.fn().mockReturnValue(RuleScope.INLINE);

    let p = new Parser();
    p.addRule(ruleInline).addRule(ruleBlock).addRule(ruleInline);

    expect(p.rules.length).toEqual(3);
    expect(p.rules[0].getScope()).toEqual(RuleScope.BLOCK);
    expect(p.rules[1].getScope()).toEqual(RuleScope.INLINE);
    expect(p.rules[2].getScope()).toEqual(RuleScope.INLINE);
});

test("Uses all the rule", () => {
    p.parseMarkdown("sample");
    expect(ParsingRule.prototype.applyTo).toHaveBeenCalledTimes(p.rules.length);
});

test("Sort by scope works", () => {
    let ruleBlock = new ParsingRule(/./g);
    let ruleInline = new ParsingRule(/./g);
    let ruleBlock2 = new ParsingRule(/./g);

    ruleBlock.getScope = jest.fn().mockReturnValue(RuleScope.BLOCK);
    ruleBlock2.getScope = jest.fn().mockReturnValue(RuleScope.BLOCK);
    ruleInline.getScope = jest.fn().mockReturnValue(RuleScope.INLINE);

    let input = [ruleInline, ruleBlock, ruleBlock2];
    let result = sortRulesByScope([ruleInline, ruleBlock, ruleBlock2]);

    expect(result.length).toEqual(input.length);
    expect(result[0].getScope()).toEqual(RuleScope.BLOCK);
    expect(result[1].getScope()).toEqual(RuleScope.BLOCK);
    expect(result[2].getScope()).toEqual(RuleScope.INLINE);
});

test("Uses the rule in order and respect the steps", () => {
    let rule1 = new ParsingRule(/./g);
    let rule2 = new ParsingRule(/./g);
    let rule3 = new ParsingRule(/./g);
    let parser = new Parser();

    const INPUT = "test";
    const RULE1_RES = "RULE1_RESULT";
    const RULE2_RES = "RULE2_RESULT";
    const RULE3_RES = "RULE3_RESULT";

    rule1.applyTo = jest.fn().mockReturnValue(RULE1_RES);
    rule2.applyTo = jest.fn().mockReturnValue(RULE2_RES);
    rule3.applyTo = jest.fn().mockReturnValue(RULE3_RES);

    parser.rules = [rule1, rule2, rule3];
    let result = parser.parseMarkdown(INPUT);

    expect(rule1.applyTo).toHaveBeenCalledWith(INPUT);
    expect(rule2.applyTo).toBeCalledWith(RULE1_RES);
    expect(rule3.applyTo).toBeCalledWith(RULE2_RES);
    expect(result).toContain(RULE3_RES);
});