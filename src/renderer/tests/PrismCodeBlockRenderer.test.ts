import { PrismCodeBlockRenderer} from "../PrismCodeBlockRenderer";

let renderer: PrismCodeBlockRenderer;
beforeEach(() => {
    renderer = new PrismCodeBlockRenderer();
})

test("It should render a <pre> block", () => {
    const result = renderer.render("", "javascript", "var x = 1;");
    
    const expects = [
        '<pre class="language-javascript">',
        '<code class="language-javascript">',
        "</code>",
        "</pre>"
    ];

    expects.forEach(e => {
        // console.log(e);
        expect(result.includes(e)).toBeTruthy();
    });
});

test("It should support a language different than JS", () => {
    const result = renderer.render("", "typescript", "var x = 1;");
    
    const expects = [
        '<pre class="language-typescript">',
        '<code class="language-typescript">',
        "</code>",
        "</pre>"
    ];

    expects.forEach(e => {
        // console.log(e);
        expect(result.includes(e)).toBeTruthy();
    });
});

test("It should render plain text if the language isn't supported", () => {
    const result = renderer.render("", "omnis", "Calculate x as 1");
    
    const expects = [
        '<pre class="language-omnis">',
        '<code class="language-omnis">',
        'Calculate x as 1',
        '</code>',
        '</pre>'
    ];

    expects.forEach(e => {
        // console.log(e);
        expect(result.includes(e)).toBeTruthy();
    });
});