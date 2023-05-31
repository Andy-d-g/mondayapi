import { DistinctArgs } from "../@types/generics";
import { CreateGroupArgs, GroupField, RemoveGroupArgs } from "../@types/group";
import { formatArgs, formatFields } from "../apiHelper";
import request from "../request";

class GroupApi {
  public static listGroup = async <T extends DistinctArgs<GroupField>>(
    board_id: number,
    fields: T
  ) => {
    return request<GroupField, typeof fields>(
      `query {boards (ids: ${board_id}) {${formatFields(fields)}} }`
    );
  };

  public static createGroup = <T extends DistinctArgs<GroupField>>(
    args: CreateGroupArgs,
    fields: T
  ) => {
    return request<GroupField, typeof fields>(
      // prettier-ignore
      `mutation { create_group (${formatArgs(args)}) {${formatFields(fields)}}}`
    );
  };

  // Need specific access that I don't have
  public static removeGroup = <T extends DistinctArgs<GroupField>>(
    args: RemoveGroupArgs,
    fields: T
  ) => {
    return request<GroupField, typeof fields>(
      // prettier-ignore
      `mutation { delete_group (${formatArgs(args)}) {${formatFields(fields)}}}`
    );
  };
}

export default GroupApi;
