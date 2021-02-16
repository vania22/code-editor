import React, { useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('as');

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
            <div ref={ref}>
                <MDEditor
                    value={value}
                    onChange={(value) => setValue(value as string)}
                    data-mdeditor="true"
                />
            </div>
        );
    }

    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={value} />
        </div>
    );
};

export default TextEditor;
