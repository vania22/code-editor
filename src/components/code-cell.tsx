import React, { useEffect, useState } from 'react';
import { build } from '../bundler';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell: React.FC = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const triggerBundle = async () => {
        const result = await build(input);
        setCode(result.code);
        setError(result.err);
    };

    useEffect(() => {
        let timer: any;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            triggerBundle();
        }, 5000);

        return () => clearTimeout(timer);
    }, [input]);

    const onEditorChange = (value) => {
        setInput(value);
    };

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'row',
                }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor
                        initalValue="const a = 1;"
                        onChange={(value) => onEditorChange(value)}
                    />
                </Resizable>

                <Preview code={code} error={error} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
