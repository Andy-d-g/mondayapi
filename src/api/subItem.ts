import { DistinctArgs } from "../@types/generics";
import { CreateSubItemArgs, ItemField } from "../@types/item";
import { formatArgs, formatFields } from "../apiHelper";
import request from "../request";

class SubItemApi {
  public static createSubItem = async <T extends DistinctArgs<ItemField>>(
    args: CreateSubItemArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ItemField, typeof fields>(
      // prettier-ignore
      `mutation { create_subitem (${formatArgs(args)}, column_values: ${column_values} ) {${formatFields(fields)}} }`
    );
  };

  public static listSubItemsByItem = async <T extends DistinctArgs<ItemField>>(
    itemId: number,
    fields: T
  ) => {
    const response = await request(
      `query { items (ids: ${itemId}) { subitems  {${formatFields(fields)}}}}`
    );
    if (!Array.isArray(response)) {
      throw new Error("data format not valid");
    }
    return (response[0].subitems || []) as Array<
      Awaited<ReturnType<typeof request<ItemField, typeof fields>>>
    >;
  };
}

export default SubItemApi;
