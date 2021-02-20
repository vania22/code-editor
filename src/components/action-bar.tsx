import React from 'react';
import { useActions } from '../hooks/use-actions';

import './action-bar.css';

interface ActionBarProps {
    id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <button title="move up" onClick={() => moveCell(id, 'up')}>
                ▲
            </button>
            <button title="move down" onClick={() => moveCell(id, 'down')}>
                ▼
            </button>
            <button title="delete" onClick={() => deleteCell(id)}>
                X
            </button>
        </div>
    );
};

export default ActionBar;
