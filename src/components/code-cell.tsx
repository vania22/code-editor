import React, { useState } from 'react';
import { build } from '../bundler';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell: React.FC = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const result = await build(input);
        setCode(result);
    };

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

                <Preview code={code} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
