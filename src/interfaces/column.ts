// https://developer.monday.com/api-reference/docs/columns

export type ColumnField = {
  archived: boolean;
  description: string;
  id: string;
  title: string;
  type: string;
  width: number;
};

export type CreateColumnArgs = {
  title: string;
  description: string;
  board_id: number;
  column_type: "text" | "status";
};

export type RemoveColumnArgs = {
  board_id: number;
  column_id: string;
};

export type UpdateColumnArgs = {
  board_id: number;
  //column_values: Record<string, string>; Manage directly into the function
  create_labels_if_missing?: boolean;
  item_id: number;
};