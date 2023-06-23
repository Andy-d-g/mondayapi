import {
  ColumnField,
  CreateColumnArgs,
  RemoveColumnArgs,
  UpdateColumnArgs,
} from "../interfaces/column";
import { DeepPick, DistinctArgs } from "../interfaces/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import { BoardField } from "../interfaces";

class ColumnApi {
  /**
   * Create column
   * @template {T}
   * @param {CreateColumnArgs} args - The arguments to create the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static create = <T extends DistinctArgs<ColumnField>>(
    args: CreateColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { create_column (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };

  /**
   * Update column by board id and column id
   * @template {T}
   * @param {UpdateColumnArgs} args - The arguments to remove the column
   * @param {T} fields - The expect fields
   * @param {Record<string, string | number>} values - The values to add into the column
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static update = <T extends DistinctArgs<ColumnField>>(
    args: UpdateColumnArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { change_multiple_column_values (${formatArgs(args)}, column_values: ${column_values}) {${formatFields(fields)}}}`
    );
  };

  /**
   * List column by board id
   * @template {T}
   * @param {number} boardId - The arguments to remove the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an array of object which contains provide fields
   */
  public static listByBoard = async <T extends DistinctArgs<ColumnField>>(
    boardId: number,
    fields: T
  ) => {
    const rawFields = fields.map(
      (field) => `boards.columns.${field}`
    ) as DistinctArgs<BoardField>;
    const response = await request<
      BoardField,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { boards (ids: ${boardId}) { columns {${formatFields(fields)}}}}`);
    return (response[0].columns || []) as DeepPick<ColumnField, T[number]>[];
  };

  /**
   * Remove column by board id and column id
   * @template {T}
   * @param {RemoveColumnArgs} args - The arguments to remove the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static remove = <T extends DistinctArgs<ColumnField>>(
    args: RemoveColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { delete_column (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };
}

export default ColumnApi;
