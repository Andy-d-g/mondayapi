// https://developer.monday.com/api-reference/docs/groups#create-a-group

import { ItemField } from "./item";
import { MinusOne } from "./generics";

export type BaseGroupField = {
  archived: boolean;
  color: string;
  deleted: boolean;
  id: string;
  title: string;
};

export type GroupField<Depth extends number = 0> = Depth extends 0
  ? BaseGroupField
  : BaseGroupField & { items: ItemField<MinusOne<Depth>>[] };

export type CreateGroupArgs = {
  board_id: number;
  group_name: string;
  relative_to?: string;
  position_relative_method?: "before_at" | "after_at";
};
export type RemoveGroupArgs = {
  board_id: number;
  group_id: string;
};
