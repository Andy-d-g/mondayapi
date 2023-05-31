import {
  ColumnField,
  CreateColumnArgs,
  RemoveColumnArgs,
  UpdateColumnArgs,
} from "../@types/column";
import { DistinctArgs } from "../@types/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request from "../request";

class ColumnApi {
  public static createColumn = <T extends DistinctArgs<ColumnField>>(
    args: CreateColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { create_column (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };

  public static removeColumn = <T extends DistinctArgs<ColumnField>>(
    args: RemoveColumnArgs,
    fields: T
  ) => {
    return request<ColumnField, typeof fields>(
      // prettier-ignore
      `mutation { delete_column (${formatArgs(args)}) {${formatFields(fields)}} }`
    );
  };

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

  public static listColumnByBoard = async <T extends DistinctArgs<ColumnField>>(
    board_id: number,
    fields: T
  ) => {
    const response = await request(
      `query {boards (ids: ${board_id}) { columns {${formatFields(fields)}}}}`
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
