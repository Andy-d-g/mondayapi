import { DeepPick, DistinctArgs } from "../interfaces/generics";
import { CreateItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import { BoardField } from "../interfaces";

class ItemApi {
  /**
   * Create item
   * @template {T}
   * @param {CreateItemArgs} args - The arguments to remove the group
   * @param {T} fields - The expect fields
   * @param {Record<string, string | number>} values - The values to add into the item
   * @return {ReturnType<typeof request<ItemField, T>>} A promise of an object which contains provide fields
   */
  public static createItem = <T extends DistinctArgs<ItemField<1>>>(
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
   * List items by boardId
   * @template {T}
   * @param {number} boardId - Board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ItemField, T>>} A promise of an object which contains provide fields
   */
  public static listItemsByBoard = async <T extends DistinctArgs<ItemField<1>>>(
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
    return (response[0].items || []) as DeepPick<ItemField, T[number]>[];
  };

  /**
   * List items by boardId and groupId
   * @template {T}
   * @param {number} boardId - Board id
   * @param {number} groupId - Group id
   * @param {T} fields - The expect fields
   * @return {Array<Awaited<ReturnType<typeof request<ItemField, typeof fields>>>>} A promise of an object which contains provide fields
   */
  public static listItemsByGroup = async <T extends DistinctArgs<ItemField<1>>>(
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
      ItemField,
      T[number]
    >[];
  };
}

export default ItemApi;
