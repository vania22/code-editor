import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import './code-editor.css';

export interface CodeEditorProps {
    initalValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    initalValue,
    onChange,
}): React.ReactElement => {
    const editorRef: any = useRef(null);

    const onEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const onEditorChange = (value) => {
        onChange(value);
    };

    const onFormatClick = () => {
        const unformatted = editorRef.current.getValue();

        const formatted = prettier
            .format(unformatted, {
                parser: 'babel',
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, '');

        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button
                onClick={onFormatClick}
                className="button button-format is-primary is-small"
            >
                Format
            </button>
            <Editor
                theme="vs-dark"
                height="20vh"
                value={initalValue}
                onMount={onEditorDidMount}
                onChange={onEditorChange}
                language="javascript"
                options={{
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
