import { DistinctArgs } from "../interfaces/generics";
import { WorkspaceField } from "../interfaces/workspace";
import { formatFields } from "../apiHelper";
import request, { ResponseFormatEnum } from "../request";

class WorkspaceApi {
  /**
   * Get workspace
   * @template {T}
   * @param {number} workspaceId - Workspace id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<WorkspaceField, T>>} A promise of an object which contains provide fields
   */
  public static getWorkspace = async <T extends DistinctArgs<WorkspaceField>>(
    workspaceId: string,
    fields: T
  ) => {
    const response = await request<
      WorkspaceField,
      typeof fields,
      ResponseFormatEnum.ARRAY
    >(`query { workspaces (ids: ${workspaceId}) {${formatFields(fields)}} }`);
    return response[0];
  };
}

export default WorkspaceApi;
