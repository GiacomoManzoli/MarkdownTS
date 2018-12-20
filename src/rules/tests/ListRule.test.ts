import { ListRule } from "../ListRule";
import { RuleScope } from "../RuleScope";

let rule: ListRule;
beforeEach(() => {
    rule = new ListRule();
});
describe("ListRule", () => {

    test("Block-scoped", () => {
        expect(rule.getScope()).toEqual(RuleScope.BLOCK);
    });

    describe("regex", () => {
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
    })

    describe("replace", () => {
        test("Calls replaceList and clearExtraTag", () => {
            rule.replaceList = jest.fn().mockReturnValue("TEST");
            rule.clearExtraTag = jest.fn().mockReturnValue("");
            rule.replace("\n\t*\tasd\n");
            expect(rule.replaceList).toBeCalled();
            expect(rule.clearExtraTag).toBeCalled();
        });

        test("returns something wrapped by \\n", () => {
            rule.afterReplace = jest.fn().mockImplementation(x => x);
            expect(rule.replace("A")).toEqual("\nA\n");
            rule.afterReplace = jest.fn().mockImplementation(x => `\n${x}\n`);
            expect(rule.replace("A")).toEqual("\nA\n");  
        });

        test("Calls clearExtraTag with the right parameters", () => {
            rule.listRegex = /([\S\s]+)/gm; // Match the whole input
            const expecetedResult = "RESULT";
            const expecetedReplaceReult = "TEST";
            const input = "\n\t*\tasd\n";
            
            rule.replaceList = jest.fn().mockReturnValue(expecetedReplaceReult); // Repleace the whole input with TEST 
            rule.clearExtraTag = jest.fn().mockReturnValue(expecetedResult);

            const result = rule.replace(input);
            expect(rule.replaceList).toBeCalledWith(input, input, 0, input); // The provided regex should match the whole input
            expect(rule.clearExtraTag).toBeCalledWith(expecetedReplaceReult, rule.maxLevel);
            expect(result).toContain(expecetedResult);
        });
    });

    describe("Utilities", () => {
        test("_calculateLevel", () => {
            expect(rule._calculateLevel("\t\t")).toEqual(3);
            expect(rule._calculateLevel("")).toEqual(1);
        });

        test("_updateMaxLevel", () => {
            expect(rule.maxLevel).toEqual(0);
            rule._updateMaxLevel(4);
            expect(rule.maxLevel).toEqual(4);
            rule._updateMaxLevel(1);
            expect(rule.maxLevel).toEqual(4);            
        })
    });

    describe("replaceList", () =>{
        test("Calls _calculateLevel",() => {
            rule._calculateLevel = jest.fn().mockReturnValue(0);
            const INPUT = "calculate_level";

            rule.replaceList("", INPUT, "","");
            expect(rule._calculateLevel).toBeCalledWith(INPUT);
        });

        test("Calls _updateMaxLevel with the right parameters and uses its return value",() => {
            const INPUT = "calculate_level";
            const CALCULATED_LEVEL = 1;
            rule._calculateLevel = jest.fn().mockReturnValue(CALCULATED_LEVEL);
            rule._updateMaxLevel = jest.fn().mockReturnValue(undefined);

            rule.replaceList("", INPUT, "","");
            expect(rule._calculateLevel).toBeCalledWith(INPUT);
            expect(rule._updateMaxLevel).toBeCalledWith(CALCULATED_LEVEL);
        });

        test("ReplaceList works with *", () => {
            let result = rule.replaceList("", "", "*", "item");
            expect(result).toMatch("<ul><li><span>item</span></li></ul>");
            result = rule.replaceList("", "\t", "*", "item");
            expect(result).toMatch("<ul><li><ul><li><span>item</span></li></ul></li></ul>");
            result = rule.replaceList("", "\t\t", "*", "item");
            expect(result).toMatch("<ul><li><ul><li><ul><li><span>item</span></li></ul></li></ul></li></ul>");
        });
    
        test("ReplaceList works with -", () => {
            let result = rule.replaceList("", "", "-", "item");
            expect(result).toMatch("<ul><li><span>item</span></li></ul>");
            result = rule.replaceList("", "\t", "-", "item");
            expect(result).toMatch("<ul><li><ul><li><span>item</span></li></ul></li></ul>");
            result = rule.replaceList("", "\t\t", "-", "item");
            expect(result).toMatch("<ul><li><ul><li><ul><li><span>item</span></li></ul></li></ul></li></ul>");
        });
    
        test("ReplaceList works with 1.", () => {
            let result = rule.replaceList("", "", "1.", "item");
            expect(result).toMatch("<ol><li><span>item</span></li></ol>");
            result = rule.replaceList("", "\t", "1.", "item");
            expect(result).toMatch("<ol><li><ol><li><span>item</span></li></ol></li></ol>");
            result = rule.replaceList("", "\t\t", "1.", "item");
            expect(result).toMatch("<ol><li><ol><li><ol><li><span>item</span></li></ol></li></ol></li></ol>");
        });
    })
    

    describe("clearExtraTag", () => {
        test("returns something separated by new-lines", () => {
            let result = rule.clearExtraTag("a",0);
            expect(result).toEqual("\na\n");
        });
    
        test("easy case", () => {
            let input = `
        <ul><li><span>item</span></li></ul>
        <ul><li><span>item</span></li></ul>
        <ul><li><span>item</span></li></ul>
        `;
            let expeceted = `\n<ul><li><span>item</span></li><li><span>item</span></li><li><span>item</span></li></ul>\n`;
            let result = rule.clearExtraTag(input,1);
            expect(result).toEqual(expeceted);
        });
    
        test("nested case", () => {
            let input = `
        <ul><li><span>item</span></li></ul>
        <ul><li><ul><li><span>item</span></li></ul></li></ul>
        <ul><li><span>item</span></li></ul>
        `;
            let expeceted = `\n<ul><li><span>item</span><ul><li><span>item</span></li></ul></li><li><span>item</span></li></ul>\n`;
            let result = rule.clearExtraTag(input,2);
            expect(result).toEqual(expeceted);
        });
    
        test("level is required", () => {
            let input = `
        <ul><li><span>item</span></li></ul>
        <ul><li><ul><li><span>item</span></li></ul></li></ul>
        <ul><li><span>item</span></li></ul>
        `;
            let expeceted = `\n<ul><li><span>item</span><ul><li><span>item</span></li></ul></li><li><span>item</span></li></ul>\n`;
            let result = rule.clearExtraTag(input,0);
            expect(result).not.toEqual(expeceted);
        });
    
        test("nested case with ol", () => {
            let input = `
        <ul><li><span>item</span></li></ul>
        <ol><li><ol><li><span>item</span></li></ol></li></ol>
        <ul><li><span>item</span></li></ul>
        `;
            let expeceted = `\n<ul><li><span>item</span><ol><li><span>item</span></li></ol></li><li><span>item</span></li></ul>\n`;
            let result = rule.clearExtraTag(input,2);
            expect(result).toEqual(expeceted);
        });
    
        test("nested mixed case", () => {
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
            let result = rule.clearExtraTag(input,4);
            // console.log(result);
            expect(result).toEqual(expeceted);
        });
    })

    describe("applyTo", () => {
        test("I: nothing mocked", () => {
            const input = "**bold text** __also blod__\n\n*text* _text_\n\n* list 1\n* list 2\n\n<hr />";
    
            const output = rule.applyTo(input);
    
    
            const expects = [
                "a",
                "\n<ul>",
                "<li><span>list 1</span></li>",
                "<li><span>list 2</span></li>",
                "</ul>\n",
                "<hr />"
            ];
    
            expects.forEach(e => {
                // console.log(e);
                expect(output.includes(e)).toBeTruthy();
            });
        }); 
    });
   
});
