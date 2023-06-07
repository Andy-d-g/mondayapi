import { DistinctArgs } from "../interfaces/generics";
import { WorkspaceField } from "../interfaces/workspace";
import { formatFields } from "../apiHelper";
import request from "../request";

class WorkspaceApi {
  /**
   * Get workspace
   * @template {T}
   * @param {number} workspaceId - Workspace id
   * @param {T} fields - The expect fields
   * @return {ReturnType<typeof request<WorkspaceField, T>>} A promise of an object which contains provide fields
   */
  public static getWorkspace = <T extends DistinctArgs<WorkspaceField>>(
    workspaceId: string,
    fields: T
  ) => {
    return request<WorkspaceField, typeof fields>(
      `query { workspaces (ids: ${workspaceId}) {${formatFields(fields)}} }`
    );
  };
}

export default WorkspaceApi;
