import { DistinctArgs } from "../interfaces/generics";
import { CreateItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request from "../request";

class ItemApi {
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

  public static listItemsByBoard = async <T extends DistinctArgs<ItemField>>(
    board_id: number,
    fields: T
  ) => {
    const response = await request(
      // prettier-ignore
      `query { boards (ids: ${board_id}) { items {${formatFields(fields)}}}}`
    );
    return response.items as ReturnType<
      typeof request<ItemField, typeof fields>
    >;
  };

  public static listItemsByGroup = async <T extends DistinctArgs<ItemField>>(
    board_id: number,
    group_id: string,
    fields: T
  ) => {
    const response = await request(
      // prettier-ignore
      `query { boards (ids: ${board_id}) { groups (ids: ${group_id}) { items {${formatFields(fields)}}}}}`
    );
    if (!(Array.isArray(response) && Array.isArray(response[0].groups))) {
      throw new Error("data format not valid");
    }
    return response[0].groups[0].items as Array<
      Awaited<ReturnType<typeof request<ItemField, typeof fields>>>
    >;
  };
}

export default ItemApi;
