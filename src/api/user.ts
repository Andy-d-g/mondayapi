import { DistinctArgs, NonEmptyArray } from "../interfaces/generics";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";
import {
  AddUserToBoardArgs,
  AddUserToWorkspaceArgs,
  UserField,
  WorkspaceField,
} from "../interfaces";

class UserApi {
  /**
   * Get me
   */
  public static me = async <T extends DistinctArgs<UserField>>(fields: T) => {
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields>(
      `query { me { ${formatedFields} } }`
    );
  };

  /**
   * Get users by ids
   */
  public static getByIds = async <T extends DistinctArgs<UserField>>(
    userIds: NonEmptyArray<UserField["id"]>,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ ids: userIds });
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { users (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * Get users by emails
   */
  public static getByEmails = async <T extends DistinctArgs<UserField>>(
    userEmails: NonEmptyArray<UserField["email"]>,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ emails: userEmails });
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { users (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * List users
   */
  public static list = async <T extends DistinctArgs<UserField>>(
    limit: number,
    fields: T
  ) => {
    const formatedFields = formatFields(fields);
    const formatedArgs = formatArgs({ limit });
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `query { users (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * Add users into a board
   */
  public static addToBoard = async <T extends DistinctArgs<UserField>>(
    args: AddUserToBoardArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs({
      board_id: args.boardId,
      user_ids: args.userIds,
      kind: args.boardKind,
    });
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `mutation { add_users_to_board (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * Add users into a workspace
   */
  public static addToWorkspace = async <T extends DistinctArgs<UserField>>(
    args: AddUserToWorkspaceArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs({
      workspace_id: args.workspaceId,
      user_ids: args.userIds,
      kind: args.workspaceKind,
    });
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields, ResponseFormatEnum.ARRAY>(
      `mutation { add_users_to_workspace (${formatedArgs}) { ${formatedFields} }}`
    );
  };

  /**
   * Remove users from a workspace
   */
  public static removeFromWorkspace = async <T extends DistinctArgs<UserField>>(
    userIds: NonEmptyArray<UserField["id"]>,
    workspaceId: WorkspaceField["id"],
    fields: T
  ) => {
    const formatedFields = formatFields(fields);
    return await request<UserField, typeof fields>(
      // prettier-ignore
      `mutation { delete_users_from_workspace (workspace_id: ${workspaceId}, user_ids: [${userIds.join(', ')}]) { ${formatedFields} }}`
    );
  };
}

export default UserApi;
