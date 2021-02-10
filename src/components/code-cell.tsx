import React, { useState } from 'react';
import { build } from '../bundler';

import CodeEditor from './code-editor';
import Preview from './preview';

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
        <div>
            <CodeEditor
                initalValue="const a = 1;"
                onChange={(value) => onEditorChange(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    );
};

export default CodeCell;
