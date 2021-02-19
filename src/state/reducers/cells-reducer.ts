import { produce } from 'immer';

import { Cell } from './../cell';
import { Action } from './../actions/index';
import { ActionType } from './../action-types/index';
import { stat } from 'fs';

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;
        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
            return state;
        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const cellIndex = state.order.indexOf(action.payload.id);
            const targetIndex =
                direction === 'down' ? cellIndex + 1 : cellIndex - 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }

            state.order[cellIndex] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;
        case ActionType.INSERT_CELL_BEFORE:
            const cell: Cell = {
                id: randomId(),
                type: action.payload.type,
                content: '',
            };

            state.data[cell.id] = cell;

            const indexOfId = state.order.indexOf(action.payload.id as string);

            if (indexOfId < 0) {
                state.order.push(cell.id);
            } else {
                state.order.splice(indexOfId, 0, cell.id);
            }
            return state;
        default:
            return state;
    }
});

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
};

export default reducer;
