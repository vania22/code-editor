import React, { useEffect, useState } from 'react';
import { build } from '../bundler';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state/cell';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const { updateCell } = useActions();

    const triggerBundle = async () => {
        const result = await build(cell.content);
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
    }, [cell.content]);

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
                        initalValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>

                <Preview code={code} error={error} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
