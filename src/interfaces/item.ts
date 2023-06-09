import { BoardField } from "./board";
import { MinusOne } from "./generics";
import { GroupField } from "./group";

// https://developer.monday.com/api-reference/docs/items

export type ItemState = "all" | "active" | "deleted" | "archived";

export type BaseItemField = {
  creator_id: string;
  email: string;
  id: string;
  name: string;
  relative_link: string;
  state: ItemState;
};

export type ItemField<Depth extends number = 0> = Depth extends 0
  ? BaseItemField
  : BaseItemField & {
      parent_item: ItemField<MinusOne<Depth>>;
      subitems: ItemField<MinusOne<Depth>>[];
      board: BoardField<MinusOne<Depth>>;
      group: GroupField<MinusOne<Depth>>;
    };

export type CreateItemArgs = {
  board_id: number;
  //column_values: Record<string, string>; Manage directly into the function
  create_labels_if_missing?: boolean;
  group_id: string;
  item_name: string;
};

export type CreateSubItemArgs = {
  parent_item_id: number;
  item_name: string;
  //column_values: Record<string, string>; Manage directly into the function
  create_labels_if_missing?: boolean;
};
