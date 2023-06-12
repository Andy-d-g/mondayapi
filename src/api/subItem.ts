import { DeepPick, DistinctArgs } from "../interfaces/generics";
import { CreateSubItemArgs, ItemField } from "../interfaces/item";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class SubItemApi {
  /**
   * Create sub item
   * @template {T}
   * @param {CreateSubItemArgs} args - Board id
   * @param {T} fields - The expect fields
   * @param {Record<string, string | number>} values - values to insert into the sub items
   * @return {ReturnType<typeof request<ItemField<1>, T>>} A promise of an object which contains provide fields
   */
  public static createSubItem = async <T extends DistinctArgs<ItemField<1>>>(
    args: CreateSubItemArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ItemField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_subitem (${formatArgs(args)}, column_values: ${column_values} ) {${formatFields(fields)}} }`
    );
  };

  /**
   * List sub items by item
   * @template {T}
   * @param {number} itemId - Item id
   * @param {T} fields - The expect fields
   * @return {Array<Awaited<ReturnType<typeof request<ItemField, typeof fields>>>>} A promise of an object which contains provide fields
   */
  public static listSubItemsByItem = async <
    T extends DistinctArgs<ItemField<1>>
  >(
    itemId: number,
    fields: T
  ) => {
    const rawFields = fields.map(
      (field) => `items.subitems.${field}`
    ) as DistinctArgs<ItemField<1>>;
    const response = await request<
      ItemField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { items (ids: ${itemId}) { subitems {${formatFields(fields)}}}}`);
    return (response[0].subitems || []) as DeepPick<ItemField<1>, T[number]>[];
  };
}

export default SubItemApi;
