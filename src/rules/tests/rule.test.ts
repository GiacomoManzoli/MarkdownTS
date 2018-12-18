import {ParsingRule} from '../rule';
import { RuleScope } from '../RuleScope';

let rule: ParsingRule;
beforeEach(() => {
    rule = new ParsingRule(/.+/g);
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

test("applyTo doesn't trim the return value", () => {
    rule.replace = jest.fn().mockImplementation((x) => x);
    let result = rule.applyTo("\na\n");
    expect(result).toEqual("\na\n");
});

test("applyTo calls afterReplace with the right parameter", () => {
    const INPUT = "X";
    const REPLACE_RETURN = "A";
    rule.replace = jest.fn().mockReturnValue(REPLACE_RETURN);
    rule.afterReplace = jest.fn().mockImplementation((x) => x);
    rule.regex = /.+/g;
    const result = rule.applyTo(INPUT);

    expect(rule.replace).toHaveBeenNthCalledWith(1,INPUT,0,INPUT); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
    expect(rule.afterReplace).toBeCalledWith(REPLACE_RETURN);
    expect(result).toEqual(REPLACE_RETURN);

});