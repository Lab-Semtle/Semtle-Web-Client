declare module 'react-syntax-highlighter' {
  import type { ComponentType } from 'react';

  export const Prism: ComponentType<any>;
  export const Light: ComponentType<any>;
  export const Dark: ComponentType<any>;
  export const Solarizedlight: ComponentType<any>;
  export const Solarizeddark: ComponentType<any>;
  export const useSyntaxHighlighter: () => void;
}

// custom.d.ts
declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const value: Record<string, unknown>;
  export default value;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight' {
  const value: Record<string, unknown>;
  export default value;
}
