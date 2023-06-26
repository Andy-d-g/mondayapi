import { DeepPick, DistinctArgs } from "../interfaces/generics";
import { CreateItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import { BoardField } from "../interfaces";

class ItemApi {
  /**
   * Create item
   */
  public static create = async <T extends DistinctArgs<ItemField<1>>>(
    args: CreateItemArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_item (${formatedArgs}, column_values: ${column_values} ) { ${formatedFields} }}`
    );
  };

  /**
   * List items by board id
   */
  public static listByBoard = async <T extends DistinctArgs<ItemField<1>>>(
    boardId: number,
    fields: T
  ) => {
    // TODO : Override BoardField[items] with DeepPick<ItemField, T[number]>[];
    const rawFields = fields.map((field) => `items.${field}`) as DistinctArgs<
      BoardField<1>
    >;
    const formatedArgs = formatArgs({ ids: [boardId] });
    const formatedFields = formatFields(fields);
    const response = await request<
      BoardField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { boards (${formatedArgs}) { items { ${formatedFields} }}}`);
    return (response[0].items || []) as DeepPick<ItemField<1>, T[number]>[];
  };

  /**
   * List items by board id and group id
   */
  public static listByGroup = async <T extends DistinctArgs<ItemField<1>>>(
    boardId: number,
    groupId: string,
    fields: T
  ) => {
    const formatedBoardArgs = formatArgs({ ids: [boardId] });
    const formatedGroupArgs = formatArgs({ ids: [groupId] });
    const formatedFields = formatFields(fields);
    const rawFields = fields.map(
      (field) => `boards.groups.${field}`
    ) as DistinctArgs<BoardField<2>>;
    const response = await request<
      BoardField<2>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(
      // prettier-ignore
      `query { boards (${formatedBoardArgs}) { groups (${formatedGroupArgs}) { items {${formatedFields} }}}}`
    );
    return (response[0].groups[0].items || []) as DeepPick<
      ItemField<1>,
      T[number]
    >[];
  };

  /**
   * Remove item by id
   */
  public static remove = async <T extends DistinctArgs<ItemField<1>>>(
    itemId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ item_id: itemId });
    const formatedFields = formatFields(fields);
    return await request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { delete_item (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * Archive item by id
   */
  public static archive = async <T extends DistinctArgs<ItemField<1>>>(
    itemId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ item_id: itemId });
    const formatedFields = formatFields(fields);
    return await request<ItemField<1>, typeof fields>(
      `mutation { archive_item (${formatedArgs}) { ${formatedFields} }}`
    );
  };
}

export default ItemApi;
