import { DistinctArgs } from "../@types/generics";
import { WorkspaceField } from "../@types/workspave";
import { formatFields } from "../apiHelper";
import request from "../request";

class WorkspaceApi {
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
