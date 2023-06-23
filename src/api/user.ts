import { DistinctArgs } from "../interfaces/generics";
import { formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import {
  BoardField,
  BoardSubscriberKind,
  UserField,
  WorkspaceField,
  WorkspaceSubscriberKind,
} from "../interfaces";

class UserApi {
  public static get = async <T extends DistinctArgs<UserField>>(
    userId: UserField["id"],
    fields: T
  ) => {
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { users (ids: ${userId} ) { ${formatFields(fields)} }}`
    );
  };

  public static list = async <T extends DistinctArgs<UserField>>(
    limit: number,
    fields: T
  ) => {
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { users (limit: ${limit}) { ${formatFields(fields)} }}`
    );
  };

  public static addToBoard = async <T extends DistinctArgs<UserField>>(
    userId: UserField["id"],
    boardId: BoardField["id"],
    kind: BoardSubscriberKind,
    fields: T
  ) => {
    return await request(
      // prettier-ignore
      `mutation { add_users_to_board (board_id: ${boardId}, user_ids: [${userId}], kind: ${kind}) { ${formatFields(fields)} }}`
    );
  };

  public static addToWorkspace = async <T extends DistinctArgs<UserField>>(
    userId: UserField["id"],
    workspaceId: WorkspaceField["id"],
    kind: WorkspaceSubscriberKind,
    fields: T
  ) => {
    return await request(
      // prettier-ignore
      `mutation { add_users_to_workspace (workspace_id: ${workspaceId}, user_ids: [${userId}], kind: ${kind}) { ${formatFields(fields)} }}`
    );
  };

  public static removeFromWorkspace = async <T extends DistinctArgs<UserField>>(
    userId: UserField["id"],
    workspaceId: WorkspaceField["id"],
    fields: T
  ) => {
    return await request(
      // prettier-ignore
      `mutation { delete_users_from_workspace (workspace_id: ${workspaceId}, user_ids: [${userId}]) { ${formatFields(fields)} }}`
    );
  };
}

export default UserApi;
