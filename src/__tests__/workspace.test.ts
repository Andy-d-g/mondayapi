import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { DistinctArgs } from "../interfaces/generics";
import api from "./utils";
import { WorkspaceField } from "../interfaces";

describe("Workspace API", () => {
  /*
  it("getWorkspace", async () => {
    const workspaceId = "123";
    const keys = ["id", "description"] satisfies DistinctArgs<WorkspaceField>;
    const response = await api.workspace.getWorkspace(workspaceId, keys);
    deepStrictEqual(Object.keys(response), keys);
  });
  */
});
