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
   * @template {T}
   * @param {number} boardId - The boardId where remove the group
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<GroupField, T>>} A promise of an array of object which contains provide fields
   */
  public static list = async <T extends DistinctArgs<GroupField<1>>>(
    boardId: number,
    fields: T
  ) => {
    const rawFields = fields.map((field) => `groups.${field}`) as DistinctArgs<
      BoardField<1>
    >;
    const response = await request<
      BoardField<1>,
      typeof rawFields,
      ResponseFormatEnum.ARRAY
    >(`query {boards (ids: ${boardId}) { groups {${formatFields(fields)}}} }`);
    return (response[0].groups || []) as DeepPick<GroupField<1>, T[number]>[];
  };

  /**
   * Create group
   * @template {T}
   * @param {CreateGroupArgs} args - The arguments to create the group
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<GroupField, T>>} A promise of an object which contains provide fields
   */
  public static create = <T extends DistinctArgs<GroupField<1>>>(
    args: CreateGroupArgs,
    fields: T
  ) => {
    return request<GroupField<1>, typeof fields>(
      // prettier-ignore
      `mutation { create_group (${formatArgs(args)}) {${formatFields(fields)}}}`
    );
  };

  /**
   * Remove group
   * @template {T}
   * @param {RemoveGroupArgs} args - The arguments to remove the group
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<GroupField, T>>} A promise of an object which contains provide fields
   */
  // Need specific access that I don't have
  public static remove = <T extends DistinctArgs<GroupField<1>>>(
    args: RemoveGroupArgs,
    fields: T
  ) => {
    return request<GroupField<1>, typeof fields>(
      // prettier-ignore
      `mutation { delete_group (${formatArgs(args)}) {${formatFields(fields)}}}`
    );
  };
}

export default GroupApi;
