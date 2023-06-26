import { DeepPick, DistinctArgs } from "../interfaces/generics";
import {
  CreateGroupArgs,
  GroupField,
  RemoveGroupArgs,
} from "../interfaces/group";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import { BoardField } from "../interfaces";

class GroupApi {
  /**
   * List group by board id
   */
  public static list = async <T extends DistinctArgs<GroupField<1>>>(
    boardId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ ids: [boardId] });
    const formatedFields = formatFields(fields);
    const rawFields = fields.map((field) => `groups.${field}`) as DistinctArgs<
      BoardField<1>
    >;
    const response = await request<
      BoardField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query { boards (${formatedArgs}) { groups {${formatedFields}}} }`);
    return (response[0].groups || []) as DeepPick<GroupField<1>, T[number]>[];
  };

  /**
   * Create group
   */
  public static create = <T extends DistinctArgs<GroupField<1>>>(
    args: CreateGroupArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return request<GroupField<1>, typeof fields>(
      `mutation { create_group (${formatedArgs}) {${formatedFields}}}`
    );
  };

  /**
   * Remove group
   */
  // Need specific access that I don't have
  public static remove = <T extends DistinctArgs<GroupField<1>>>(
    args: RemoveGroupArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return request<GroupField<1>, typeof fields>(
      `mutation { delete_group (${formatedArgs}) {${formatedFields}}}`
    );
  };
}

export default GroupApi;
