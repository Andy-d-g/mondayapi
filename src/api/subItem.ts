import { DeepPick, DistinctArgs } from "../interfaces/generics";
import { CreateSubItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class SubItemApi {
  /**
   * Create sub item
   * @template {T}
   */
  public static create = async <T extends DistinctArgs<ItemField<1>>>(
    args: CreateSubItemArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const formatedArgs = formatArgs(args);
    const column_values = JSON.stringify(JSON.stringify(values));
    const formatedFields = formatFields(fields);
    return request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_subitem (${formatedArgs}, column_values: ${column_values} ) {${formatedFields}} }`
    );
  };

  /**
   * List sub items by item
   */
  public static listByItem = async <T extends DistinctArgs<ItemField<1>>>(
    itemId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ ids: [itemId] });
    const formatedFields = formatFields(fields);
    const rawFields = fields.map(
      (field) => `items.subitems.${field}`
    ) as DistinctArgs<ItemField<1>>;
    const response = await request<
      ItemField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { items (${formatedArgs}) { subitems {${formatedFields}}}}`);
    return (response[0].subitems || []) as DeepPick<ItemField<1>, T[number]>[];
  };
}

export default SubItemApi;
