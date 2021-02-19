import { CellTypes, CellDirection } from './../cell';
import { ActionType } from './../action-types/index';
import {
    Action,
    UpdateCellAction,
    DeleteCellAction,
    MoveCellAction,
    InsertCellBeforeAction,
} from './../actions/index';

export const updateCell = (id: string, content: string): UpdateCellAction => ({
    type: ActionType.UPDATE_CELL,
    payload: { id, content },
});

export const deleteCell = (id: string): DeleteCellAction => ({
    type: ActionType.DELETE_CELL,
    payload: id,
});

export const moveCell = (
    id: string,
    direction: CellDirection,
): MoveCellAction => ({
    type: ActionType.MOVE_CELL,
    payload: {
        id,
        direction,
    },
});

export const insertCellBefore = (
    id: string,
    type: CellTypes,
): InsertCellBeforeAction => ({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: { id, type },
});
