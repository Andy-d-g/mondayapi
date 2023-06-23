import { after, before, describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { DistinctArgs } from "../interfaces/generics";
import {
  ColumnField,
  CreateColumnArgs,
  RemoveColumnArgs,
  UpdateColumnArgs,
} from "../interfaces";
import api from "./utils";

let board_id = 123;
let group_id = "123";
let item_id = 123;
let column_id = "123";

describe("Column API", () => {
  before(async () => {
    const responseBoard = await api.board.create(
      { board_name: "board_name", board_kind: "share" },
      ["id"]
    );
    board_id = Number(responseBoard.id);
    const responseGroup = await api.group.create(
      { board_id, group_name: "group_name" },
      ["id"]
    );
    group_id = responseGroup.id;
    const responseItem = await api.item.create(
      {
        board_id,
        group_id,
        item_name: "item_test",
      },
      ["id"],
      {}
    );
    item_id = Number(responseItem.id);
  });

  after(async () => {
    await api.board.remove(board_id, ["id"]);
  });

  it("create", async () => {
    const args: CreateColumnArgs = {
      title: "column_title",
      description: "description",
      board_id,
      column_type: "text",
    };
    const keys = ["id", "description"] satisfies DistinctArgs<ColumnField>;
    const response = await api.column.create(args, keys);
    deepStrictEqual(Object.keys(response), keys);
    column_id = response.id;
  });

  it("update", async () => {
    const args: UpdateColumnArgs = {
      item_id,
      board_id,
    };
    const keys = ["id"] satisfies DistinctArgs<ColumnField>;
    const response = await api.column.update(args, keys, {});
    deepStrictEqual(Object.keys(response), keys);
  });

  it("listByBoard", async () => {
    const keys = ["id", "description"] satisfies DistinctArgs<ColumnField>;
    const response = await api.column.listByBoard(board_id, keys);
    // Create a 'name' column by default
    strictEqual(response.length, 2);
    deepStrictEqual(Object.keys(response[0]), keys);
  });

  it("remove", async () => {
    const args: RemoveColumnArgs = {
      board_id,
      column_id,
    };
    const keys = ["id", "title"] satisfies DistinctArgs<ColumnField>;
    const response = await api.column.remove(args, keys);
    deepStrictEqual(Object.keys(response), keys);
  });
});
