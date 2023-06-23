import { after, before, describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { DistinctArgs } from "../interfaces/generics";
import { CreateSubItemArgs, ItemField } from "../interfaces";
import api from "./utils";

let board_id = 123;
let group_id = "123";
let item_id = 123;

describe("Sub Item API", () => {
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
    const item_name = "test";
    const args: CreateSubItemArgs = {
      item_name,
      parent_item_id: item_id,
    };
    const keys = ["id", "name", "state"] satisfies DistinctArgs<ItemField<1>>;
    const response = await api.subItem.create(args, keys, {});
    deepStrictEqual(Object.keys(response), keys);
    strictEqual(response.name, item_name);
  });

  it("listByItem", async () => {
    const keys = ["id", "name"] satisfies DistinctArgs<ItemField>;
    const response = await api.subItem.listByItem(item_id, keys);
    strictEqual(response.length, 1);
    deepStrictEqual(Object.keys(response[0]), keys);
  });
});
