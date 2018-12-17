import {ParsingRule} from '../rule';
import { RuleScope } from '../RuleScope';

let rule: ParsingRule;
beforeEach(() => {
    rule = new ParsingRule(/./g);
})

test("getScope()", () => {
    expect(rule.getScope()).toEqual(rule.scope);
});

test("Correctly scoped", () => {
    expect(rule.getScope()).toEqual(RuleScope.UNSET); 
})

test("replace throws", () => {
    expect(rule.replace).toThrowError();
})

test("applyTo throws", () => {
    expect(rule.applyTo).toThrowError();
})

test("applyTo works with an implemented replace", () => {
    rule.replace = jest.fn().mockImplementation((x) => x);
    expect(rule.applyTo.bind(rule, "")).not.toThrowError();
})

test("applyTo  calls afterReplace", () => {
    rule.replace = jest.fn().mockImplementation((x) => x);
    rule.afterReplace = jest.fn().mockImplementation((x) => x);
    expect(rule.applyTo("")).toBeDefined()
    expect(rule.afterReplace).toBeCalled();
})