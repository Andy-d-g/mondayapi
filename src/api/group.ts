import { DistinctArgs } from "../interfaces/generics";
import {
  CreateGroupArgs,
  GroupField,
  RemoveGroupArgs,
} from "../interfaces/group";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class GroupApi {
  /**
   * List group by board id
   * @template {T}
   * @param {number} boardId - The boardId where remove the group
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<GroupField, T>>} A promise of an array of object which contains provide fields
   */
  public static listGroup = async <T extends DistinctArgs<GroupField<1>>>(
    boardId: number,
    fields: T
  ) => {
    return request<GroupField<1>, typeof fields, ResponseFormatEnum.ARRAY>(
      `query {boards (ids: ${boardId}) {${formatFields(fields)}} }`
    );
  };

  /**
   * Create group
   * @template {T}
   * @param {CreateGroupArgs} args - The arguments to create the group
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<GroupField, T>>} A promise of an object which contains provide fields
   */
  public static createGroup = <T extends DistinctArgs<GroupField<1>>>(
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
  public static removeGroup = <T extends DistinctArgs<GroupField<1>>>(
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
