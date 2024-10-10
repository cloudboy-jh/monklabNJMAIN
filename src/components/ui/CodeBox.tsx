import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from "next-themes";

interface CodeBoxProps {
  selectedTechStack: string[];
}

const CodeBox: React.FC<CodeBoxProps> = ({ selectedTechStack }) => {
  const { theme } = useTheme();
  const codeSnippet = generateCodeSnippet(selectedTechStack);

  return (
    <div className={`code-box ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} p-4 rounded-md shadow-md`}>
      <SyntaxHighlighter language="javascript">
        {codeSnippet}
      </SyntaxHighlighter>
      <button className="copy-button" onClick={() => navigator.clipboard.writeText(codeSnippet)}>
        Copy Code
      </button>
    </div>
  );
};

function generateCodeSnippet(selectedTechStack: string[]): string {
  // Generate code based on selected tech stack
  return `// Example code based on selections: ${selectedTechStack.join(', ')}`;
}

export default CodeBox;