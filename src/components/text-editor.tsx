import React, { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './text-editor.css';
import { Cell } from '../state/cell';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);

    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (
                ref.current &&
                e.target &&
                ref.current.contains(e.target as Node)
            ) {
                return;
            } else {
                setEditing(false);
            }
        };

        document.addEventListener('click', listener, { capture: true });

        return () =>
            document.removeEventListener('click', listener, { capture: true });
    }, []);

    if (editing) {
        return (
            <div ref={ref} className="text-editor">
                <MDEditor
                    value={cell.content}
                    onChange={(value) => updateCell(cell.id, value || '')}
                    data-mdeditor="true"
                />
            </div>
        );
    }

    return (
        <div onClick={() => setEditing(true)} className="text-editor card">
            <div className="card-content">
                <MDEditor.Markdown source={cell.content} />
            </div>
        </div>
    );
};

export default TextEditor;
