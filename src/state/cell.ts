export interface Cell {
    id: string;
    content: string;
    type: CellTypes;
}

export type CellTypes = 'code' | 'text';
