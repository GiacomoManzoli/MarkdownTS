import { RuleScope } from "../RuleScope";

test("Block < Inline < Unset", () => {
    expect(RuleScope.BLOCK).toBeLessThan(RuleScope.INLINE);
    expect(RuleScope.INLINE).toBeLessThan(RuleScope.UNSET);
})