export interface Cell {
    id: string;
    content: string;
    type: CellTypes;
}

export type CellDirection = 'up' | 'down';

export type CellTypes = 'code' | 'text';
