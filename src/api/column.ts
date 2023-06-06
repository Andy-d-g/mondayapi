import {
  ColumnField,
  CreateColumnArgs,
  RemoveColumnArgs,
  UpdateColumnArgs,
} from "../interfaces/column";
import { DistinctArgs } from "../interfaces/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request from "../request";

class ColumnApi {
  /**
   * Create column
   * @template {T}
   * @param {CreateColumnArgs} args - The arguments to create the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static createColumn = <T extends DistinctArgs<ColumnField>>(
    args: CreateColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { create_column (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };

  /**
   * Remove column by board id and column id
   * @template {T}
   * @param {RemoveColumnArgs} args - The arguments to remove the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static removeColumn = <T extends DistinctArgs<ColumnField>>(
    args: RemoveColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { delete_column (${formatArgs(args)}) {${formatFields(fields)}} }`
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
  public static updateColumn = <T extends DistinctArgs<ColumnField>>(
    args: UpdateColumnArgs,
    fields: T,
    values: Record<string, string | number>
  ) => {
    const column_values = JSON.stringify(JSON.stringify(values));
    return request(
      // prettier-ignore
      `mutation { change_multiple_column_values (${formatArgs(args)}, column_values: ${column_values}) {${formatFields(fields)}}}`
    );
  };

  /**
   * List column by board id
   * @template {T}
   * @param {number} boardId - The arguments to remove the column
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<ColumnField, T>>} A promise of an object which contains provide fields
   */
  public static listColumnByBoard = async <T extends DistinctArgs<ColumnField>>(
    boardId: number,
    fields: T
  ) => {
    const response = await request(
      `query {boards (ids: ${boardId}) { columns {${formatFields(fields)}}}}`
    );
    if (!Array.isArray(response)) {
      throw new Error("data format not valid");
    }
    return response[0].columns as ReturnType<
      typeof request<ColumnField, typeof fields>
    >;
  };
}

export default ColumnApi;
