import React from 'react';
import { useActions } from '../hooks/use-actions';

import './add-cell-bar.css';

interface AddCellBarProps {
    nextCellId: string;
}

const AddCellBar: React.FC<AddCellBarProps> = ({ nextCellId }) => {
    const { insertCellBefore } = useActions();

    return (
        <div className="add-cell-bar ">
            <div className="divider" />
            <button
                className="button button-format is-primary"
                onClick={() => insertCellBefore(nextCellId, 'text')}
            >
                <b>+</b> Text
            </button>
            <button
                className="button button-format is-primary"
                onClick={() => insertCellBefore(nextCellId, 'code')}
            >
                <b>+</b> Code
            </button>
        </div>
    );
};

export default AddCellBar;
