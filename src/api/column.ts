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
   */
  public static create = async <T extends DistinctArgs<ColumnField>>(
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
   */
  public static update = async <T extends DistinctArgs<ColumnField>>(
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
   */
  public static remove = async <T extends DistinctArgs<ColumnField>>(
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
