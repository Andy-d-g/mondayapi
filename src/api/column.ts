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
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return request<ColumnField, typeof fields>(
      `mutation { create_column (${formatedArgs}) {${formatedFields}} }`
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
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    const column_values = JSON.stringify(JSON.stringify(values));
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { change_multiple_column_values (${formatedArgs}, column_values: ${column_values}) {${formatedFields}}}`
    );
  };

  /**
   * List column by board id
   */
  public static listByBoard = async <T extends DistinctArgs<ColumnField>>(
    boardId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ ids: [boardId] });
    const formatedFields = formatFields(fields);
    const rawFields = fields.map(
      (field) => `boards.columns.${field}`
    ) as DistinctArgs<BoardField>;
    const response = await request<
      BoardField,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { boards (${formatedArgs}) { columns {${formatedFields}}}}`);
    return (response[0].columns || []) as DeepPick<ColumnField, T[number]>[];
  };

  /**
   * Remove column by board id and column id
   */
  public static remove = async <T extends DistinctArgs<ColumnField>>(
    args: RemoveColumnArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return request<ColumnField, typeof fields>(
      `mutation { delete_column (${formatedArgs}) {${formatedFields}} }`
    );
  };
}

export default ColumnApi;
