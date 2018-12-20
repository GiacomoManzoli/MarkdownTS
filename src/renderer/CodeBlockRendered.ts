import { BlockRenderer } from "./BlockRenderer";

export interface CodeBlockRenderer extends BlockRenderer {
    render(block: string, language: string, code: string): string;
}