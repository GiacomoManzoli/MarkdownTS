import { ListRule } from "../ListRule";
import { RuleScope } from "../RuleScope";

let rule: ListRule;
beforeEach(() => {
    rule = new ListRule();
});

test("Block-scoped", () => {
    expect(rule.getScope()).toEqual(RuleScope.BLOCK);    
});

test("Calls replaceList", () => {
    rule.replaceList = jest.fn().mockReturnValue("TEST");
    rule.replace("\n\t*\tasd\n");
    expect(rule.replaceList).toBeCalled();
});

test("Can find list a valid list", () => {
    const markdown = "\n\n* test\n* test2\n";
    const result = rule.regex.exec(markdown);
    expect(result).toBeDefined();
    expect(result[0].trim()).toBe("* test\n* test2");
})

test("Can find list a valid list with only one \\n before", () => {
    const markdown = "\n* test\n* test2\n";
    const result = rule.regex.exec(markdown);
    expect(result).toBeDefined();
    expect(result[0].trim()).toBe("* test\n* test2");
})

test("Can find list a valid list within some text (with no blank line)", () => {
    const markdown = "dummy text\n\n* test\n* test2\nother dummy text";
    const result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");

})

test("Can find list a valid list within some text (with a blank line)", () => {
    const markdown = "dummy text\n\n* test\n* test2\n\nother dummy text";
    const result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");
})

test("Can find list a valid list within some text (at the end)", () => {
    const markdown = "dummy text\n\n* test\n* test2\n\nother dummy text";
    const result = rule.regex.exec(markdown);

    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");
})

test("Does match a list without a new line at the end", () => {
    let markdown = "\n\n* test\n* test2";
    rule.regex.lastIndex = 0;
    let result = rule.regex.exec(markdown);

    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");

    markdown = "\n\n* test\n* test2\nsome other text";
    rule.regex.lastIndex = 0;
    result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");

})

test("Does match a single lsit which does not start with \\n\\n or ends with \n", () => {
    let markdown = "* test\n* test2\n";
    rule.regex.lastIndex = 0;
    let result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");

    markdown = "* test\n* test2";
    rule.regex.lastIndex = 0;
    result = rule.regex.exec(markdown);
    expect(result).not.toBeNull();
    expect(result[0].trim()).toBe("* test\n* test2");
})


test("ReplaceList works with *", () => {
    let result = rule.replaceList("", "", "*", "item");
    expect(result).toMatch("<ul><li><span>item</span></li></ul>");
    expect(rule.maxLevel).toEqual(1);
    result = rule.replaceList("", "\t", "*", "item");
    expect(result).toMatch("<ul><li><ul><li><span>item</span></li></ul></li></ul>");
    expect(rule.maxLevel).toEqual(2);
    result = rule.replaceList("", "\t\t", "*", "item");
    expect(result).toMatch("<ul><li><ul><li><ul><li><span>item</span></li></ul></li></ul></li></ul>");
    expect(rule.maxLevel).toEqual(3);
});

test("ReplaceList works with -", () => {
    let result = rule.replaceList("", "", "-", "item");
    expect(result).toMatch("<ul><li><span>item</span></li></ul>");
    expect(rule.maxLevel).toEqual(1);
    result = rule.replaceList("", "\t", "-", "item");
    expect(result).toMatch("<ul><li><ul><li><span>item</span></li></ul></li></ul>");
    expect(rule.maxLevel).toEqual(2);
    result = rule.replaceList("", "\t\t", "-", "item");
    expect(result).toMatch("<ul><li><ul><li><ul><li><span>item</span></li></ul></li></ul></li></ul>");
    expect(rule.maxLevel).toEqual(3);
});

test("ReplaceList works with -", () => {
    let result = rule.replaceList("", "", "1.", "item");
    expect(result).toMatch("<ol><li><span>item</span></li></ol>");
    expect(rule.maxLevel).toEqual(1);
    result = rule.replaceList("", "\t", "1.", "item");
    expect(result).toMatch("<ol><li><ol><li><span>item</span></li></ol></li></ol>");
    expect(rule.maxLevel).toEqual(2);
    result = rule.replaceList("", "\t\t", "1.", "item");
    expect(result).toMatch("<ol><li><ol><li><ol><li><span>item</span></li></ol></li></ol></li></ol>");
    expect(rule.maxLevel).toEqual(3);
});


test("Replace List - Max level does not decrease", () => {
    let result = rule.replaceList("", "", "*", "item");
    expect(rule.maxLevel).toEqual(1);
    result = rule.replaceList("", "\t", "*", "item");
    expect(rule.maxLevel).toEqual(2);
    result = rule.replaceList("", "\t", "*", "item");
    expect(rule.maxLevel).toEqual(2);
});

test("After replace - easy case", () => {
    let input = `
    <ul><li><span>item</span></li></ul>
    <ul><li><span>item</span></li></ul>
    <ul><li><span>item</span></li></ul>
    `;
    let expeceted = `\n<ul><li><span>item</span></li><li><span>item</span></li><li><span>item</span></li></ul>\n`;
    rule.maxLevel = 1;
    let result = rule.afterReplace(input);
    expect(result).toEqual(expeceted);
});

test("After replace - nested case", () => {
    let input = `
    <ul><li><span>item</span></li></ul>
    <ul><li><ul><li><span>item</span></li></ul></li></ul>
    <ul><li><span>item</span></li></ul>
    `;
    let expeceted = `\n<ul><li><span>item</span><ul><li><span>item</span></li></ul></li><li><span>item</span></li></ul>\n`;
    rule.maxLevel = 2;
    let result = rule.afterReplace(input);
    expect(result).toEqual(expeceted);
});

test("After replace - max level is required", () => {
    let input = `
    <ul><li><span>item</span></li></ul>
    <ul><li><ul><li><span>item</span></li></ul></li></ul>
    <ul><li><span>item</span></li></ul>
    `;
    let expeceted = `\n<ul><li><span>item</span><ul><li><span>item</span></li></ul></li><li><span>item</span></li></ul>\n`;
    rule.maxLevel = 0;
    let result = rule.afterReplace(input);
    expect(result).not.toEqual(expeceted);
});

test("After replace - nested case with ol", () => {
    let input = `
    <ul><li><span>item</span></li></ul>
    <ol><li><ol><li><span>item</span></li></ol></li></ol>
    <ul><li><span>item</span></li></ul>
    `;
    let expeceted = `\n<ul><li><span>item</span><ol><li><span>item</span></li></ol></li><li><span>item</span></li></ul>\n`;
    rule.maxLevel = 2;
    let result = rule.afterReplace(input);
    expect(result).toEqual(expeceted);
});

test("After replace - nested mixed case", () => {
    let input = `
    <ol><li><span>elem 1</span></li></ol>
    <ol><li><span>elem 2</span></li></ol>
    <ul><li><ul><li><span>child 3</span></li></ul></li></ul>
    <ul><li><ul><li><ul><li><span>child 4</span></li></ul></li></ul></li></ul>
    <ol><li><ol><li><ol><li><ol><li><span>child 5</span></li></ol></li></ol></li></ol></li></ol>
    <ol><li><ol><li><ol><li><ol><li><span>6</span></li></ol></li></ol></li></ol></li></ol>
    <ul><li><ul><li><ul><li><span>5</span></li></ul></li></ul></li></ul>
    <ul><li><ul><li><ul><li><ul><li><span>61</span></li></ul></li></ul></li></ul></li></ul>
    <ol><li><span>elem 3</span></li></ol>
    `;
    let expeceted = `\n<ol><li><span>elem 1</span></li><li><span>elem 2</span><ul><li><span>child 3</span><ul><li><span>child 4</span><ol><li><span>child 5</span></li><li><span>6</span></li></ol></li><li><span>5</span><ul><li><span>61</span></li></ul></li></ul></li></ul></li><li><span>elem 3</span></li></ol>\n`;
    rule.maxLevel = 4;
    let result = rule.afterReplace(input);
    expect(result).toEqual(expeceted);
});