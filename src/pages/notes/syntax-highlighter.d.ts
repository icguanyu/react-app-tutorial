// react-syntax-highlighter 沒有內建型別，這裡只宣告 NotesPage 用到的部分
declare module "react-syntax-highlighter" {
  import type { ComponentType, CSSProperties, ReactNode } from "react";
  interface SyntaxHighlighterProps {
    language?: string;
    style?: Record<string, CSSProperties>;
    showLineNumbers?: boolean;
    customStyle?: CSSProperties;
    children?: ReactNode;
  }
  export const PrismLight: ComponentType<SyntaxHighlighterProps> & {
    registerLanguage(name: string, grammar: unknown): void;
  };
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  export const vscDarkPlus: Record<string, import("react").CSSProperties>;
}

declare module "react-syntax-highlighter/dist/esm/languages/prism/*" {
  const grammar: unknown;
  export default grammar;
}
