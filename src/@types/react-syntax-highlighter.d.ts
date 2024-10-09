// monklabnj/src/@types/react-syntax-highlighter.d.ts
declare module 'react-syntax-highlighter' {
    import { ComponentType } from 'react';
    
    export const Prism: ComponentType<any>;
    export const Light: ComponentType<any>;
    export const Dark: ComponentType<any>;
}

// Declare the styles module separately
declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    export const tomorrow: any;
    // Add other styles if needed
}
