import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCellBar from './add-cell-bar';

import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data } }) =>
        order.map((id) => data[id]),
    );

    const renderedCells = cells.map((cell, i) => (
        <CellListItem
            cell={cell}
            nextCellId={i !== cells.length - 1 ? cells[i + 1].id : ''}
            key={cell.id}
        />
    ));

    return (
        <div>
            <AddCellBar nextCellId={cells[0]?.id || ''} />
            {renderedCells}
        </div>
    );
};

export default CellList;
