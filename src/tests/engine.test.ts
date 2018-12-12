import {Engine} from "../engine";
import {Parser} from "../parser";
jest.mock("../parser");


test("Use the parser", () => {
    Parser.prototype.parseMarkdown = jest.fn().mockImplementation(Parser.prototype.parseMarkdown);
    let parser = new Parser();
    
    let engine = new Engine(parser);
    let input = "Sample text";
    let output = engine.render(input);
    expect(parser.parseMarkdown).toBeCalled();
    expect(output).toEqual("RENDERED_MARKDOWN");
})