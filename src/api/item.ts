import { DistinctArgs } from "../interfaces/generics";
import { CreateItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class ItemApi {
  /**
   * Create item
   * @template {T}
   * @param {CreateItemArgs} args - The arguments to remove the group
   * @param {T} fields - The expect fields
   * @param {Record<string, string | number>} values - The values to add into the item
   * @return {ReturnType<typeof request<ItemField, T>>} A promise of an object which contains provide fields
   */
  public static createItem = <T extends DistinctArgs<ItemField>>(
    args: CreateItemArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ItemField, typeof fields>(
      // prettier-ignore
      `mutation { create_item (${formatArgs(args)}, column_values: ${column_values} ) {${formatFields(fields)}}}`
    );
  };

  /**
   * List items by boardId
   * @template {T}
   * @param {number} boardId - Board id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ItemField, T>>} A promise of an object which contains provide fields
   */
  public static listItemsByBoard = async <T extends DistinctArgs<ItemField>>(
    boardId: number,
    fields: T
  ) => {
    const response = await request(
      // prettier-ignore
      `query { boards (ids: ${boardId}) { items {${formatFields(fields)}}}}`
    );
    return response.items as ReturnType<
      typeof request<ItemField, typeof fields, ResponseFormatEnum.ARRAY>
    >;
  };

  /**
   * List items by boardId and groupId
   * @template {T}
   * @param {number} boardId - Board id
   * @param {number} groupId - Group id
   * @param {T} fields - The expect fields
   * @return {Array<Awaited<ReturnType<typeof request<ItemField, typeof fields>>>>} A promise of an object which contains provide fields
   */
  public static listItemsByGroup = async <T extends DistinctArgs<ItemField>>(
    boardId: number,
    groupId: string,
    fields: T
  ) => {
    const response = await request(
      // prettier-ignore
      `query { boards (ids: ${boardId}) { groups (ids: ${groupId}) { items {${formatFields(fields)}}}}}`
    );
    if (!(Array.isArray(response) && Array.isArray(response[0].groups))) {
      throw new Error("data format not valid");
    }
    return response[0].groups[0].items as Awaited<
      ReturnType<
        typeof request<ItemField, typeof fields, ResponseFormatEnum.ARRAY>
      >
    >;
  };
}

export default ItemApi;
