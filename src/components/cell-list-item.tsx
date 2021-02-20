import React from 'react';
import { Cell } from '../state/cell';
import ActionBar from './action-bar';
import AddCellBar from './add-cell-bar';

import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
    cell: Cell;
    nextCellId: string;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell, nextCellId }) => {
    let child: JSX.Element;

    if (cell.type === 'code') {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />;
    }

    return (
        <div>
            <ActionBar id={cell.id} />
            {child}
            <AddCellBar nextCellId={nextCellId} />
        </div>
    );
};

export default CellListItem;
