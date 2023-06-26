import { DistinctArgs } from "../interfaces/generics";
import { CreateWorkspaceArgs, WorkspaceField } from "../interfaces/workspace";
import { formatArgs, formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class WorkspaceApi {
  /**
   * Create workspace
   */
  public static create = async <T extends DistinctArgs<WorkspaceField>>(
    args: CreateWorkspaceArgs,
    fields: T
  ) => {
    const formatedArgs = formatArgs(args);
    const formatedFields = formatFields(fields);
    return await request<WorkspaceField, typeof fields>(
      `mutation { create_workspace (${formatedArgs}) {${formatedFields}}}`
    );
  };

  /**
   * Get workspace by id
   */
  public static get = async <T extends DistinctArgs<WorkspaceField>>(
    workspaceId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ ids: [workspaceId] });
    const formatedFields = formatFields(fields);
    const response = await request<
      WorkspaceField,
      typeof fields,
      ResponseFormatEnum.ARRAY
    >(`query { workspaces (${formatedArgs}) {${formatedFields}} }`);
    return response[0];
  };

  /**
   * Remove workspace by id
   */
  public static remove = async <T extends DistinctArgs<WorkspaceField>>(
    workspaceId: number,
    fields: T
  ) => {
    const formatedArgs = formatArgs({ workspace_id: workspaceId });
    const formatedFields = formatFields(fields);
    return await request<WorkspaceField, typeof fields>(
      `mutation { delete_workspace (${formatedArgs}) { ${formatedFields} }}`
    );
  };
}

export default WorkspaceApi;
