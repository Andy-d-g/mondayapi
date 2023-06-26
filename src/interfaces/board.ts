import { ColumnField } from "./column";
import { MinusOne } from "./generics";
import { GroupField } from "./group";
import { ItemField } from "./item";
import { UserField } from "./user";

// https://developer.monday.com/api-reference/docs/boards
export type BoardKind = "public" | "private" | "share";

export type BoardSubscriberKind = "subscriber" | "owner";

export type BaseBoardField = {
  description: string;
  id: string;
  name: string;
  board_kind: BoardKind;
  columns: ColumnField[];
  subscribers: UserField[];
  owners: UserField[];
  creator: UserField[];
};

export type BoardField<Depth extends number = 0> = Depth extends 0
  ? BaseBoardField
  : BaseBoardField & {
      items: ItemField<MinusOne<Depth>>[];
      groups: GroupField<MinusOne<Depth>>[];
    };

export type CreateBoardArgs = {
  board_name: string;
  board_kind: BoardKind;
  workspace_id?: number;
  description?: string;
};
