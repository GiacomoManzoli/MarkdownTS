import {ParsingRule} from '../rule';


test("replace throws", () => {
    let rule = new ParsingRule(/./g);
    expect(rule.replace).toThrowError();
})

test("applyTo throws", () => {
    let rule = new ParsingRule(/./g);
    expect(rule.applyTo).toThrowError();
})

test("applyTo works with an implemented replace", () => {
    let rule = new ParsingRule(/./g);
    rule.replace = jest.fn().mockImplementation((x) => x);

    expect(rule.applyTo.bind(rule, "")).not.toThrowError();

})

test("applyTo  calls afterReplace", () => {
    let rule = new ParsingRule(/./g);
    rule.replace = jest.fn().mockImplementation((x) => x);
    rule.afterReplace = jest.fn().mockImplementation((x) => x);

    expect(rule.applyTo("")).toBeDefined()
    expect(rule.afterReplace).toBeCalled();
})