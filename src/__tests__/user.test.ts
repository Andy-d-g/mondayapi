import { after, before, describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { DistinctArgs } from "../interfaces/generics";
import api from "./utils";
import { UserField } from "../interfaces";

let email = "andy.guillaume75@gmail.com";
let boardId = 123;
let workspaceId = 123;
let meId = 123;

describe("User API", () => {
  before(async () => {
    const responseWorkspace = await api.workspace.create(
      {
        kind: "open",
        name: "workspaceName",
      },
      ["id"]
    );
    workspaceId = responseWorkspace.id;
    const responseBoard = await api.board.create(
      { board_name: "board_name", board_kind: "share" },
      ["id"]
    );
    boardId = Number(responseBoard.id);
    const me = await api.user.me(["id"]);
    meId = me.id;
  });

  after(async () => {
    await api.board.remove(boardId, ["id"]);
    await api.workspace.remove(workspaceId, ["id"]);
  });

  it("me", async () => {
    const keys = [
      "id",
      "country_code",
      "email",
      "is_admin",
    ] satisfies DistinctArgs<UserField>;
    const response = await api.user.me(keys);
    deepStrictEqual(Object.keys(response), keys);
  });

  it("getByIds", async () => {
    const keys = [
      "id",
      "country_code",
      "email",
      "is_admin",
    ] satisfies DistinctArgs<UserField>;
    const me = await api.user.me(keys);
    const response = await api.user.getByIds([Number(me.id)], keys);
    strictEqual(response.length, 1);
    deepStrictEqual(Object.keys(response[0]), keys);
    deepStrictEqual(me, response[0]);
  });

  it("getByEmails", async () => {
    const keys = [
      "id",
      "location",
      "email",
      "title",
    ] satisfies DistinctArgs<UserField>;
    const me = await api.user.me(keys);
    const response = await api.user.getByEmails([email], keys);
    strictEqual(response.length, 1);
    deepStrictEqual(Object.keys(response[0]), keys);
    deepStrictEqual(me, response[0]);
  });

  it("list", async () => {
    const keys = ["id"] satisfies DistinctArgs<UserField>;
    const limit = 10;
    const response = await api.user.list(limit, keys);
    deepStrictEqual(Object.keys(response[0]), keys);
    strictEqual(response.length, 1);
  });

  it("addToBoard", async () => {
    const keys = ["id"] satisfies DistinctArgs<UserField>;
    const response = await api.user.addToBoard(
      {
        boardId,
        userIds: [meId],
      },
      keys
    );
    deepStrictEqual(Object.keys(response[0]), keys);
    strictEqual(response.length, 1);
    const board = await api.board.get(boardId, ["subscribers.id"]);
    strictEqual(board.subscribers[0].id, meId);
  });

  it("addToWorkspace", async () => {
    const keys = ["id"] satisfies DistinctArgs<UserField>;
    const response = await api.user.addToWorkspace(
      {
        userIds: [meId],
        workspaceId,
      },
      keys
    );
    deepStrictEqual(Object.keys(response[0]), keys);
    strictEqual(response.length, 1);
    const workspace = await api.workspace.get(workspaceId, [
      "owners_subscribers.id",
    ]);
    strictEqual(workspace.owners_subscribers[0].id, meId);
  });
});
