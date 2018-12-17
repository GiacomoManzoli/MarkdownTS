import { BoldRule, ItalicRule, StrikeRule, InlineCodeRule, QuoteRule } from '../TextStyleRules';
import { RuleScope } from '../RuleScope';

test("Inline-scoped", () => {
    let rule = new BoldRule();
    expect(rule.getScope()).toEqual(RuleScope.INLINE);
    let rule2 = new ItalicRule();
    expect(rule2.getScope()).toEqual(RuleScope.INLINE);   
    let rule3 = new StrikeRule();
    expect(rule3.getScope()).toEqual(RuleScope.INLINE);   
    let rule4 = new QuoteRule();
    expect(rule4.getScope()).toEqual(RuleScope.INLINE); 
    let rule5 = new InlineCodeRule();
    expect(rule5.getScope()).toEqual(RuleScope.INLINE);     
});

test("Bold - replace works", () => {
    let rule = new BoldRule();
    let res = rule.replace('ANY','ANY','BOLD');
    let expected = "<strong>BOLD</strong>";
    expect(res).toBe(expected);
})
test("Bold - applyTo works", () => {
    let rule = new BoldRule();
    let input = "**bold** not bold";
    let output = rule.applyTo(input);
    expect(output).toEqual("<strong>bold</strong> not bold");
    input = "__bold__ not bold";
    output = rule.applyTo(input);
    expect(output).toEqual("<strong>bold</strong> not bold");
})
// -----------------
test("Italic - replace works", () => {
    let rule = new ItalicRule();
    let res = rule.replace('ANY','ANY','Italic');
    let expected = "<em>Italic</em>";
    expect(res).toBe(expected);
})
test("Italic - applyTo works", () => {
    let rule = new ItalicRule();
    let input = "*Italic* not bold";
    let output = rule.applyTo(input);
    expect(output).toEqual("<em>Italic</em> not bold");
    input = "_Italic_ not bold";
    output = rule.applyTo(input);
    expect(output).toEqual("<em>Italic</em> not bold");
})
// -----------------
test("Strike - replace works", () => {
    let rule = new StrikeRule();
    let res = rule.replace('ANY','Italic');
    let expected = "<del>Italic</del>";
    expect(res).toBe(expected);
})
test("Strike - applyTo StrikeRule", () => {
    let rule = new StrikeRule();
    let input = "~~Italic~~ not bold";
    let output = rule.applyTo(input);
    expect(output).toEqual("<del>Italic</del> not bold");
})
// -----------------
test("InlineCode - replace works", () => {
    let rule = new InlineCodeRule();
    let res = rule.replace('ANY','Italic');
    let expected = "<code>Italic</code>";
    expect(res).toBe(expected);
})
test("InlineCode - applyTo StrikeRule", () => {
    let rule = new InlineCodeRule();
    let input = "`Italic` not bold";
    let output = rule.applyTo(input);
    expect(output).toEqual("<code>Italic</code> not bold");
})
test("InlineCode - applyTo don't mess with ```", () => {
    let rule = new InlineCodeRule();
    let input = "```";
    let output = rule.applyTo(input);
    expect(output).toEqual("```");
})
test("InlineCode - regex", () => {
    let rule = new InlineCodeRule();
    let input = "```";
    let res = rule.regex.exec(input);
    expect(res).toBeNull();
    rule.regex.lastIndex = 0;

    input = "```asd```";
    res = rule.regex.exec(input);
    expect(res).not.toBeNull();
    expect(res[0]).toEqual("`asd`");
    rule.regex.lastIndex = 0;
})
// -----------------
test("Quote - replace works", () => {
    let rule = new QuoteRule();
    let res = rule.replace('ANY','Italic');
    let expected = "<q>Italic</q>";
    expect(res).toBe(expected);
})
test("Quote - applyTo works", () => {
    let rule = new QuoteRule();
    let input = ":\"Italic\": not bold";
    let output = rule.applyTo(input);
    expect(output).toEqual("<q>Italic</q> not bold");
})