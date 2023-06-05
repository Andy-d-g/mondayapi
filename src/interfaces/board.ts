// https://developer.monday.com/api-reference/docs/boards
export type BoardKind = "public" | "private" | "share";

export type BoardField = {
  board_kind: BoardKind;
  description: string;
  id: number;
  name: string;
};

export type CreateBoardArgs = {
  board_name: string;
  board_kind: BoardKind;
  workspace_id?: number;
};
