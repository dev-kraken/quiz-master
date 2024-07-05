import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippetProps {
    language: string;
    code: string
}

const CodeSnippet = ({language, code}: CodeSnippetProps) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={nord}
            CodeTag="code"
            wrapLines={true}>
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeSnippet;