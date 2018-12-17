import { BlockQuoteRule } from "../BlockQuoteRule";
import { RuleScope } from "../RuleScope";

let rule: BlockQuoteRule;
beforeEach(() => {
    rule = new BlockQuoteRule();
});

test("Block-scoped", () => {
    expect(rule.getScope()).toEqual(RuleScope.BLOCK);
});

test("Can find a block quote", () => {
    let markdown = "XXX\n> test2\nXXX";
    let result = rule.regex.exec(markdown);
    rule.regex.lastIndex = 0;
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("> test2");

    markdown = "> a";
    result = rule.regex.exec(markdown);
    rule.regex.lastIndex = 0;
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("> a");

    markdown = "a> a";
    result = rule.regex.exec(markdown);
    rule.regex.lastIndex = 0;
    expect(result).toBeNull();

})

test("Can find a blockquote with an %gt; symbol", () => {
    const markdown = "XXX\n&gt; test2\nXXX";
    const result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("&gt; test2");
})

test("Can find multiple blockquote", () => {
    let markdown = ">> asd";
    let result = rule.regex.exec(markdown);
    rule.regex.lastIndex = 0;
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe(">> asd");
    expect(result[1].trim()).toBe(">>");
    expect(result[2].trim()).toBe("asd");

    markdown = "&gt;&gt;&gt; a";
    result = rule.regex.exec(markdown);
    rule.regex.lastIndex = 0;
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("&gt;&gt;&gt; a");
    expect(result[1].trim()).toBe("&gt;&gt;&gt;");
    expect(result[2].trim()).toBe("a");
    
    markdown = "> a\n>> a\n> a\n";
    result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("> a");
    expect(result[1].trim()).toBe(">");
    expect(result[2].trim()).toBe("a");
    result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe(">> a");
    expect(result[1].trim()).toBe(">>");
    expect(result[2].trim()).toBe("a");
    result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("> a");
    expect(result[1].trim()).toBe(">");
    expect(result[2].trim()).toBe("a");
    result = rule.regex.exec(markdown);
    expect(result).toBeNull();
})

test("Calculate level", () => {
    expect(rule.calculateLevel("asdasd")).toBe(0);
    expect(rule.calculateLevel("")).toBe(0);
    expect(rule.calculateLevel("a>")).toBe(0);

    expect(rule.calculateLevel(">")).toBe(1);
    expect(rule.calculateLevel(">>")).toBe(2);
    expect(rule.calculateLevel(">&gt;>")).toBe(3);
    expect(rule.calculateLevel("&gt;>")).toBe(2);
    expect(rule.calculateLevel("&gt;A>")).toBe(1);
});


test("Replace works with >", () => {
    let result: string;
    rule.calculateLevel = jest.fn().mockReturnValue(1);
    result = rule.replace("> a",">", " a ");
    expect(result).toBe("<blockquote>\na\n</blockquote>");
    expect(rule.maxLevel).toBe(1);
});

test("Replace works with &gt;", () => {
    let result: string;
    rule.calculateLevel = jest.fn().mockReturnValue(1);
    result = rule.replace("&gt; a","&gt;", " a ");
    expect(result).toBe("<blockquote>\na\n</blockquote>");
    expect(rule.maxLevel).toBe(1);
});

test("Replace works with nested quote", () => {
    let result: string;
    rule.calculateLevel = jest.fn().mockReturnValue(2);
    result = rule.replace(">> a",">>", " a ");
    expect(result).toBe("<blockquote><blockquote>\na\n</blockquote></blockquote>");
    expect(rule.maxLevel).toBe(2);
});

test("afterReplace works with consecutive quote", () => {
    let input = "<blockquote>\nP1\n</blockquote>\n<blockquote>\nP2\n</blockquote>";
    let expeceted = "\n<blockquote>\nP1\n\nP2\n</blockquote>\n";
    rule.maxLevel = 1;
    expect(rule.afterReplace(input)).toEqual(expeceted);
})

test("afterReplace works with nested quote", () => {
    let input = "<blockquote>\nP1\n</blockquote>\n<blockquote><blockquote>\nP2\n</blockquote></blockquote>\<blockquote>\nP1\n</blockquote>";
    let expeceted = "\n<blockquote>\nP1\n<blockquote>\nP2\n</blockquote>\nP1\n</blockquote>\n";
    rule.maxLevel = 2;
    expect(rule.afterReplace(input)).toEqual(expeceted);
})

test("afterReplace works with consecutive but separeted quote", () => {
    let input = "<blockquote>\nP1\n</blockquote>\n\n<blockquote>\nP1\n</blockquote>";
    let expeceted = "\n<blockquote>\nP1\n</blockquote>\n\n<blockquote>\nP1\n</blockquote>\n";
    rule.maxLevel = 2;
    expect(rule.afterReplace(input)).toEqual(expeceted);
})