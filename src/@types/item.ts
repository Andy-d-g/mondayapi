import { BoardField } from "./board";
import { MinusOne } from "./generics";
import { GroupField } from "./group";

export type ItemState = "all" | "active" | "deleted" | "archived";

export type BaseItemField = {
  board: BoardField;
  creator_id: string;
  email: string;
  group: GroupField;
  id: string;
  name: string;
  relative_link: string;
  state: ItemState;
};

type _ItemField<Depth extends number> = Depth extends 0
  ? BaseItemField
  : BaseItemField & {
      parent_item: _ItemField<MinusOne<Depth>>;
      subitems: _ItemField<MinusOne<Depth>>[];
    };

export type ItemField = _ItemField<1>;

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
