// https://developer.monday.com/api-reference/docs/groups#create-a-group

export type GroupField = {
  archived: boolean;
  color: string;
  deleted: boolean;
  id: string;
  title: string;
};

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
