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
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_item (${formatArgs(args)}, column_values: ${column_values} ) { ${formatFields(fields)} }}`
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
    const response = await request<
      BoardField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(
      // prettier-ignore
      `query { boards (ids: ${boardId}) { items {${formatFields(fields)} }}}`
    );
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
    const rawFields = fields.map(
      (field) => `boards.groups.${field}`
    ) as DistinctArgs<BoardField<2>>;
    const response = await request<
      BoardField<2>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(
      // prettier-ignore
      `query { boards (ids: ${boardId}) { groups (ids: ${groupId}) { items {${formatFields(fields)} }}}}`
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
    return await request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { delete_item (item_id: ${itemId}) { ${formatFields(fields)} }}`
    );
  };

  /**
   * Archive item by id
   */
  public static archive = async <T extends DistinctArgs<ItemField<1>>>(
    itemId: number,
    fields: T
  ) => {
    return await request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { archive_item (item_id: ${itemId}) { ${formatFields(fields)} }}`
    );
  };
}

export default ItemApi;
