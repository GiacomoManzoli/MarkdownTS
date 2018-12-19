import { PlainCodeBlockRenderer } from "../PlainCodeBlockRenderer";

test("It should render a <pre> block", () => {
    const renderer = new PlainCodeBlockRenderer();
    const result = renderer.render("", "javascript", "var x = 1;");
    expect(result).toBe('<pre class="javascript">var x = 1;</pre>');
}) 