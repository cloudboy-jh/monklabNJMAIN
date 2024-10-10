import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from "next-themes";

interface CodeBoxProps {
  selectedTechStack: string[];
}

const CodeBox: React.FC<CodeBoxProps> = ({ selectedTechStack }) => {
  const { theme } = useTheme();
  const codeSnippet = generateCodeSnippet(selectedTechStack);

  // Define theme-based styles
  const containerClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';

  return (
    <div
      className={`p-6 rounded-md shadow-md ${containerClass}`}
      style={{ width: '100%', maxWidth: '800px', height: '500px' }}
    >
      <SyntaxHighlighter
        language="javascript"
        style={{ backgroundColor: 'transparent', color: theme === 'dark' ? '#F8F8F2' : '#333' }}
      >
        {codeSnippet}
      </SyntaxHighlighter>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigator.clipboard.writeText(codeSnippet)}
      >
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